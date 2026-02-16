# Sprintwise Backend - AWS Deployment

Deploy the backend to AWS Lambda + S3 (us-east-2).

## Prerequisites

- AWS CLI configured (`aws configure`)
- AWS SAM CLI installed (`brew install aws-sam-cli` or [install](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))
- Account ID: 989635529126
- Region: us-east-2

---

## Step 1: Install SAM CLI (if needed)

```bash
# macOS
brew install aws-sam-cli

# Or via pip
pip install aws-sam-cli
```

---

## Step 2: Build and Deploy

```bash
cd backend

# Build (packages Lambda)
sam build

# Deploy (creates/updates stack)
sam deploy \
  --guided \
  --parameter-overrides KIEApiKey=YOUR_KIE_API_KEY \
  --region us-east-2
```

On first run, `--guided` will prompt:
- **Stack name**: `sprintwise-api` (or any name)
- **AWS Region**: `us-east-2`
- **Parameter KIEApiKey**: Your KIE API key (or pass via `--parameter-overrides`)
- **Confirm changes**: Y
- **Allow SAM CLI IAM role creation**: Y
- **Disable rollback**: N
- **Save arguments to config**: Y (creates `samconfig.toml` for future deploys)

**Subsequent deploys** (after `samconfig.toml` exists):

```bash
sam build && sam deploy --parameter-overrides KIEApiKey=YOUR_KIE_API_KEY
```

---

## Step 3: Get Outputs

After deploy, note the outputs:

```bash
aws cloudformation describe-stacks \
  --stack-name sprintwise-api \
  --region us-east-2 \
  --query 'Stacks[0].Outputs'
```

You'll get:
- **ApiUrl**: `https://xxxx.execute-api.us-east-2.amazonaws.com/prod`
- **BucketName**: `sprintwise-uploads-989635529126`
- **BucketUrl**: `https://sprintwise-uploads-989635529126.s3.us-east-2.amazonaws.com`

---

## Step 4: Configure Next.js

Add to `.env` (or `.env.local`):

```env
NEXT_PUBLIC_API_URL=https://YOUR_API_ID.execute-api.us-east-2.amazonaws.com/prod
```

Replace with your actual ApiUrl from Step 3.

---

## Step 5: Test

### Health check

```bash
curl https://YOUR_API_URL/health
# {"status":"ok"}
```

### Upload (requires multipart form)

```bash
curl -X POST https://YOUR_API_URL/upload \
  -F "file=@/path/to/image.png"
# {"url":"https://sprintwise-uploads-xxx.s3.us-east-2.amazonaws.com/uploads/xxx.png","filename":"xxx.png"}
```

### KIE create task

```bash
curl -X POST https://YOUR_API_URL/api/kie/create-task \
  -H "Content-Type: application/json" \
  -d '{"templateUrl":"https://...","userImageUrl":"https://..."}'
# {"taskId":"xxx"}
```

### KIE status

```bash
curl "https://YOUR_API_URL/api/kie/status?taskId=YOUR_TASK_ID"
```

---

## Local Development (Docker)

```bash
cd backend

# Create .env with:
# KIE_API_KEY=xxx
# S3_BUCKET=sprintwise-uploads-989635529126
# AWS_REGION=us-east-2
# PUBLIC_FILE_BASE=https://sprintwise-uploads-989635529126.s3.us-east-2.amazonaws.com

docker compose up --build
# API at http://localhost:8000
```

For local dev, use the **deployed** S3 bucket so uploads are publicly reachable (KIE needs to fetch them).

---

## S3 Bucket Notes

- Objects under `uploads/` are **publicly readable** (for KIE to fetch)
- Lambda has S3 write permission via `S3CrudPolicy`
- Bucket name: `sprintwise-uploads-989635529126` (must be globally unique; change if taken)

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Bucket name already exists | Change `BucketName` in `template.yaml` to e.g. `sprintwise-uploads-989635529126-us2` |
| CORS errors | Ensure `NEXT_PUBLIC_API_URL` has no trailing slash |
| 403 on S3 upload | Check Lambda has `s3:PutObject` and bucket allows ACLs; ensure `PublicAccessBlock` is disabled for ACLs |
| KIE fails to fetch image | Ensure image URL is publicly accessible (S3 or deployed app) |
