#!/bin/bash
# Upload poster templates to S3 so KIE can fetch them (localhost URLs don't work)
# Run once after deploying the backend

BUCKET="sprintwise-uploads-989635529126"
REGION="us-east-2"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "Uploading templates to s3://$BUCKET/uploads/templates/"
aws s3 cp "$PROJECT_ROOT/public/assets/zen_minimal.png" "s3://$BUCKET/uploads/templates/zen_minimal.png" --region "$REGION" --content-type "image/png"
aws s3 cp "$PROJECT_ROOT/public/assets/professional_career.png" "s3://$BUCKET/uploads/templates/professional_career.png" --region "$REGION" --content-type "image/png"
aws s3 cp "$PROJECT_ROOT/public/assets/warm_mother.png" "s3://$BUCKET/uploads/templates/warm_mother.png" --region "$REGION" --content-type "image/png"

echo "Done. Template base URL: https://$BUCKET.s3.$REGION.amazonaws.com/uploads/templates"
