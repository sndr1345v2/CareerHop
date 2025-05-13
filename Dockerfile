# ---------- Base image ----------
    FROM node:20-slim

    # ---------- Set working directory ----------
    WORKDIR /app
    
    # ---------- Copy and install client (frontend) ----------
    COPY client/package*.json ./client/
    WORKDIR /app/client
    RUN npm ci
    
    # Copy full client app and build it
    COPY client/ .
    RUN npm run build
    
    # ---------- Back to root, set up server ----------
    WORKDIR /app
    COPY package*.json ./
    RUN npm install -g esbuild
    
    # Copy server and shared code
    COPY server/ ./server/
    COPY shared/ ./shared/
    
    # Build backend with esbuild
    RUN esbuild server/index.ts \
      --platform=node \
      --packages=external \
      --bundle \
      --format=esm \
      --outfile=dist/index.js
    
    # ---------- Final step: run app ----------
    CMD ["node", "dist/index.js"]
    