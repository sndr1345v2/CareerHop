# CareerHop

A semi-anonymous social network for engineering students with AI-powered job and mentor recommendations, discussion forums, and professional networking capabilities.

## Features

- User authentication with privacy controls
- Discussion "bowls" for engineering topics
- Job listings and mentor recommendations
- Educational resources section
- Professional networking capabilities

## Deployment to Google Cloud Platform

This application is configured for deployment on Google Cloud Platform. You can choose from several deployment options:

### Option 1: Google App Engine

#### Prerequisites
1. [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed
2. Google Cloud account with billing enabled
3. Git installed

#### Deployment Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd careerhop
   ```

2. **Initialize Google Cloud SDK**
   ```bash
   gcloud init
   ```

3. **Create a new project (or use an existing one)**
   ```bash
   gcloud projects create careerhop-app
   gcloud config set project careerhop-app
   ```

4. **Enable required APIs**
   ```bash
   gcloud services enable appengine.googleapis.com
   gcloud services enable cloudbuild.googleapis.com
   ```

5. **Deploy to App Engine**
   ```bash
   gcloud app deploy app.yaml
   ```

6. **View your application**
   ```bash
   gcloud app browse
   ```

### Option 2: Google Cloud Run (Container-based)

#### Prerequisites
1. [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed
2. [Docker](https://docs.docker.com/get-docker/) installed locally
3. Google Cloud account with billing enabled

#### Deployment Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd careerhop
   ```

2. **Initialize Google Cloud SDK**
   ```bash
   gcloud init
   gcloud config set project careerhop-app
   ```

3. **Enable required APIs**
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

4. **Build and push the Docker image**
   ```bash
   gcloud builds submit --tag gcr.io/careerhop-app/careerhop
   ```

5. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy careerhop \
     --image gcr.io/careerhop-app/careerhop \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

### Option 3: Continuous Deployment with Cloud Build

You can set up continuous deployment using Cloud Build:

1. **Connect your GitHub repository to Cloud Build**
   - Go to [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers)
   - Click "Create Trigger"
   - Connect to your GitHub repository
   - Configure the trigger to use the `cloudbuild.yaml` file

2. **Set up environment variables**
   - In the Cloud Build trigger settings, add environment variables:
     - `SESSION_SECRET`
     - Other application-specific secrets

## Database Setup

### Using Cloud SQL

1. **Create a PostgreSQL instance**
   ```bash
   gcloud sql instances create careerhop-db \
     --database-version=POSTGRES_13 \
     --tier=db-f1-micro \
     --region=us-central1
   ```

2. **Create a database**
   ```bash
   gcloud sql databases create careerhop \
     --instance=careerhop-db
   ```

3. **Create a user**
   ```bash
   gcloud sql users create careerhop-user \
     --instance=careerhop-db \
     --password=YOUR_PASSWORD
   ```

4. **Get connection details**
   ```bash
   gcloud sql instances describe careerhop-db
   ```
   
   Note the `connectionName` in the output.

5. **Configure environment variables**

   For App Engine, add to app.yaml:
   ```yaml
   env_variables:
     DATABASE_URL: "postgres://careerhop-user:YOUR_PASSWORD@localhost/careerhop"
     INSTANCE_CONNECTION_NAME: "your-project:region:careerhop-db"
   ```

   For Cloud Run:
   ```bash
   gcloud run services update careerhop \
     --set-env-vars DATABASE_URL="postgres://careerhop-user:YOUR_PASSWORD@localhost/careerhop" \
     --set-env-vars INSTANCE_CONNECTION_NAME="your-project:region:careerhop-db" \
     --add-cloudsql-instances "your-project:region:careerhop-db"
   ```

## Environment Variables

The application requires the following environment variables:

- `NODE_ENV`: Set to "production" for production environments
- `PORT`: The port the server runs on (set automatically by Google Cloud)
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret key for session encryption
- `INSTANCE_CONNECTION_NAME`: (For Cloud SQL) The connection name of your Cloud SQL instance

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- Frontend: React, Tailwind CSS, shadcn/ui
- Backend: Express.js, Passport.js
- Database: PostgreSQL with Drizzle ORM
- Hosting: Google Cloud Platform