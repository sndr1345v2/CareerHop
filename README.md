# CareerHop

A semi-anonymous social network for engineering students with AI-powered job and mentor recommendations, discussion forums, and professional networking features.

## Features

- User authentication with privacy controls
- Discussion "bowls" for engineering topics
- Job listings and mentor recommendations
- Educational resources section
- Professional networking capabilities

## Deployment to Heroku

This application is configured for deployment on Heroku. Follow these steps to deploy:

### Prerequisites

1. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
2. Heroku account
3. Git installed

### Deployment Steps

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd careerhop
   ```

2. **Login to Heroku**
   ```
   heroku login
   ```

3. **Create a Heroku app**
   ```
   heroku create careerhop
   ```

4. **Add PostgreSQL add-on**
   ```
   heroku addons:create heroku-postgresql:hobby-dev
   ```

5. **Configure environment variables**
   ```
   heroku config:set NODE_ENV=production
   heroku config:set SESSION_SECRET=<your-session-secret>
   ```

6. **Deploy the application**
   ```
   git push heroku main
   ```

7. **Run database migrations (if needed)**
   ```
   heroku run npm run db:push
   ```

8. **Open the application**
   ```
   heroku open
   ```

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

## Database

The application uses an in-memory database by default for development. For production on Heroku, it automatically connects to the PostgreSQL database provided by Heroku.

To enable PostgreSQL locally, set the `DATABASE_URL` environment variable:

```
DATABASE_URL=postgres://username:password@localhost:5432/careerhop npm run dev
```

## Environment Variables

- `NODE_ENV`: Set to "production" for production environments
- `PORT`: The port the server runs on (set automatically by Heroku)
- `DATABASE_URL`: PostgreSQL connection string (set automatically by Heroku PostgreSQL add-on)
- `SESSION_SECRET`: Secret key for session encryption

## Tech Stack

- Frontend: React, Tailwind CSS, shadcn/ui
- Backend: Express.js, Passport.js
- Database: PostgreSQL with Drizzle ORM
- Hosting: Heroku