FROM node:20-slim

# Backend install
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Copy client code
COPY client/index.html ./client/index.html
COPY client/vite.config.ts ./client/vite.config.ts
COPY client/public ./client/public
COPY client/src ./client/src
COPY client/package*.json ./client/
WORKDIR /app/client
RUN npm ci
RUN npm run build

# Move frontend build into public dist folder
WORKDIR /app
RUN mkdir -p dist/public && cp -r client/dist/* dist/public/

# Copy backend server
COPY server ./server
COPY shared ./shared

# Build server code
RUN npm install -g esbuild
RUN esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

CMD ["node", "dist/index.js"]