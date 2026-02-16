"""Sprintwise backend: upload (S3) + KIE image generation."""
import logging
import os
import uuid
from pathlib import Path

import requests
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger(__name__)

KIE_BASE_URL = os.getenv("KIE_BASE_URL", "https://api.kie.ai")
KIE_API_KEY = os.getenv("KIE_API_KEY", "")
KIE_MODEL = os.getenv("KIE_MODEL", "nano-banana-pro")
S3_BUCKET = os.getenv("S3_BUCKET", "")
AWS_REGION = os.getenv("AWS_REGION", "us-east-2")
PUBLIC_FILE_BASE = os.getenv("PUBLIC_FILE_BASE", "")
CALENDAR_PROMPT = os.getenv(
    "CALENDAR_PROMPT",
    """You have two input images:
1. USER IMAGE: A photo of the person (can be a selfie or portrait)
2. REFERENCE CALENDAR: A themed calendar/planner template (e.g., beige planner with cartoon character, icons, layout)

TASK:
Create an output image that is an EXACT REPLICA of the reference calendar, with ONE change: replace ALL human or cartoon characters in the reference with a cartoon/stylized version of the person from the user image.

REPLICATION RULES:
- Copy the reference calendar layout EXACTLY: same structure, same positions, same proportions
- Preserve the 30-day grid: same number of cells, same arrangement (e.g., 6×5 or 5×6)
- Keep all 30 cells EMPTY—no text, numbers, or goals inside any cell
- Preserve the theme: colors, line style, background, decorative elements (icons, borders, labels)
- Preserve the exact pixel layout so the output can be overlaid with text at fixed coordinates

CHARACTER REPLACEMENT:
- Identify every human/cartoon character in the reference (e.g., person peeking over "Goals", avatar in corner)
- Replace each with a cartoon/stylized version of the person from the user image
- Match the reference's cartoon style (e.g., same line weight, same level of detail)
- Keep the character's pose, position, and size the same as in the reference
- Preserve clothing style/colors from the user image where possible
- Keep only single character, the user in the same style

CONSISTENCY:
- Output must have the same dimensions and layout as the reference
- The 30-day grid must remain in the same position with the same cell sizes
- Only the character(s) change—everything else is an exact copy

Purpose: The output will be used as a base. Goals will be added programmatically at fixed pixel positions. Layout must be predictable and identical across generations.""",
)

app = FastAPI(title="Sprintwise API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def require_kie() -> None:
    if not KIE_API_KEY:
        raise HTTPException(status_code=500, detail="KIE_API_KEY is not configured")


def require_s3() -> None:
    if not S3_BUCKET:
        raise HTTPException(status_code=500, detail="S3_BUCKET is not configured")


def upload_to_s3(file_path: Path, content_type: str, key: str) -> str:
    import boto3

    s3 = boto3.client("s3", region_name=AWS_REGION)
    s3.upload_file(
        Filename=str(file_path),
        Bucket=S3_BUCKET,
        Key=key,
        ExtraArgs={"ContentType": content_type},
    )
    if PUBLIC_FILE_BASE:
        return f"{PUBLIC_FILE_BASE.rstrip('/')}/{key}"
    return f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{key}"


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)) -> dict:
    require_s3()
    if not file.filename:
        raise HTTPException(status_code=400, detail="Missing filename")

    ext = Path(file.filename).suffix or ".png"
    filename = f"{uuid.uuid4().hex}{ext}"
    key = f"uploads/{filename}"

    content = await file.read()
    tmp = Path("/tmp") / filename
    tmp.write_bytes(content)

    try:
        url = upload_to_s3(tmp, file.content_type or "image/png", key)
        return {"url": url, "filename": filename}
    finally:
        if tmp.exists():
            tmp.unlink()


@app.post("/api/kie/create-task")
def create_kie_task(payload: dict) -> dict:
    require_kie()
    templateUrl = payload.get("templateUrl")
    userImageUrl = payload.get("userImageUrl")
    if not templateUrl or not userImageUrl:
        raise HTTPException(
            status_code=400,
            detail="templateUrl and userImageUrl are required",
        )

    response = requests.post(
        f"{KIE_BASE_URL}/api/v1/jobs/createTask",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {KIE_API_KEY}",
        },
        json={
            "model": KIE_MODEL,
            "input": {
                "prompt": CALENDAR_PROMPT,
                "image_input": [templateUrl, userImageUrl],
                "aspect_ratio": "4:3",
                "resolution": "1K",
                "output_format": "png",
            },
        },
        timeout=60,
    )
    if not response.ok:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    data = response.json()
    task_id = data.get("data", {}).get("taskId")
    if not task_id:
        raise HTTPException(status_code=500, detail="No taskId in KIE response")
    return {"taskId": task_id}


@app.get("/api/kie/status")
def kie_status(taskId: str) -> dict:
    require_kie()
    response = requests.get(
        f"{KIE_BASE_URL}/api/v1/jobs/recordInfo",
        headers={"Authorization": f"Bearer {KIE_API_KEY}"},
        params={"taskId": taskId},
        timeout=60,
    )
    if not response.ok:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()
