# AWS Lambda Python base image - arm64 to match Lambda
FROM public.ecr.aws/lambda/python:3.12-arm64

COPY requirements.txt ${LAMBDA_TASK_ROOT}/
RUN pip install --no-cache-dir -r ${LAMBDA_TASK_ROOT}/requirements.txt

COPY main.py lambda_handler.py ${LAMBDA_TASK_ROOT}/

CMD ["lambda_handler.handler"]
