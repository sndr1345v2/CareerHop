FROM node:20-slim

WORKDIR /app

# ---------------- Install backend dependencies ----------------
COPY package*.json ./
RUN npm ci

# ---------------- Build frontend ----------------
COPY client ./client
WORKDIR /app/client
RUN npm ci
RUN npm run build  # ← Vite builds to /app/client/dist

# ---------------- Back to root, setup backend ----------------
WORKDIR /app

COPY server ./server
COPY shared ./shared

# Install and build backend
RUN npm install -g esbuild
RUN esbuild server/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outfile=dist/index.js

#  ---------------- Copy frontend build to backend ----------------
RUN mkdir -p dist/public && cp -r client/dist/* dist/public/

# ---------------- Start the server ----------------
CMD ["node", "dist/index.js"]
