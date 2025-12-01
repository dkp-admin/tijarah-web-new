# Tijarah Web - Cloud Run Deployment Guide

## Project Details
- **GCP Project:** `dev-tijarah`
- **Region:** `us-central1`
- **Service Name:** `tijarah-web`

---

## Files to Add

Copy these files to your `web/` folder (same level as package.json):

```
web/
├── Dockerfile           ← ADD THIS
├── .dockerignore        ← ADD THIS (rename from dockerignore.txt)
├── cloudbuild.yaml      ← ADD THIS
├── package.json
├── next.config.js       ← ALREADY CONFIGURED ✓
└── src/
```

---

## Quick Deploy Commands

### Step 1: Upload to Cloud Shell

```bash
# In Cloud Shell, upload web.zip and extract
cd ~
unzip web.zip -d tijarah-complete
cd tijarah-complete/web
```

### Step 2: Add Deployment Files

Upload Dockerfile, dockerignore.txt, cloudbuild.yaml to the web/ folder

```bash
# Rename dockerignore
mv dockerignore.txt .dockerignore
```

### Step 3: Set Project & Enable APIs

```bash
gcloud config set project dev-tijarah
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### Step 4: Build & Deploy

```bash
gcloud builds submit --tag gcr.io/dev-tijarah/tijarah-web:latest --timeout=1800s
```

### Step 5: Deploy to Cloud Run

```bash
gcloud run deploy tijarah-web \
  --image gcr.io/dev-tijarah/tijarah-web:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 1 \
  --max-instances 10 \
  --set-env-vars "NODE_ENV=production,NEXT_PUBLIC_APP_ENV=production,NEXT_PUBLIC_FRONTEND_URL=https://app.tijarah360.com,NEXT_PUBLIC_PRODUCTION_API_URL=https://be.tijarah360.com"
```

### Step 6: Get Service URL

```bash
gcloud run services describe tijarah-web --region us-central1 --format "value(status.url)"
```

---

## All Commands (Copy & Paste)

```bash
# Set project
gcloud config set project dev-tijarah

# Enable APIs
gcloud services enable cloudbuild.googleapis.com run.googleapis.com containerregistry.googleapis.com

# Build (10-15 min)
gcloud builds submit --tag gcr.io/dev-tijarah/tijarah-web:latest --timeout=1800s

# Deploy
gcloud run deploy tijarah-web --image gcr.io/dev-tijarah/tijarah-web:latest --platform managed --region us-central1 --allow-unauthenticated --memory 1Gi --cpu 1 --min-instances 1 --max-instances 10 --set-env-vars "NODE_ENV=production,NEXT_PUBLIC_APP_ENV=production,NEXT_PUBLIC_FRONTEND_URL=https://app.tijarah360.com,NEXT_PUBLIC_PRODUCTION_API_URL=https://be.tijarah360.com"

# Get URL
gcloud run services describe tijarah-web --region us-central1 --format "value(status.url)"
```

---

## Monitoring

```bash
# View logs
gcloud run services logs tail tijarah-web --region us-central1

# Check status
gcloud run services describe tijarah-web --region us-central1
```

---

## Environment Variables

| Variable | Value |
|----------|-------|
| NODE_ENV | production |
| NEXT_PUBLIC_APP_ENV | production |
| NEXT_PUBLIC_FRONTEND_URL | https://app.tijarah360.com |
| NEXT_PUBLIC_PRODUCTION_API_URL | https://be.tijarah360.com |

---

## Cloud Run Settings

| Setting | Value |
|---------|-------|
| Memory | 1Gi |
| CPU | 1 |
| Min Instances | 1 |
| Max Instances | 10 |
| Concurrency | 80 |
| Timeout | 60s |
