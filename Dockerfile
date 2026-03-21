FROM node:23-slim

WORKDIR /app

# Copy package config and lockfile
COPY package.json package-lock.json tsconfig.json ./

# Install dependencies (only required since this is the only build step)
RUN npm ci

# Copy server and static files
COPY server.ts data.json ./
COPY public ./public

# Expose port
EXPOSE 3000

# Run the app directly using tsx
CMD ["npm", "start"]
