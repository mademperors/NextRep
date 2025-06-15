# 1. Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 2. Build the SSR app
FROM node:20-alpine AS build
WORKDIR /app

# Accept build arguments for environment variables
ARG VITE_API_URL
# Set environment variables for Vite build
ENV VITE_API_URL=$VITE_API_URL

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# 3. Production image
FROM node:20-alpine
WORKDIR /app

# Copy only what's needed for runtime
COPY package.json yarn.lock ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build

# Expose the SSR server port (default 5173, adjust if needed)
EXPOSE 5173

# Start the SSR server
CMD ["yarn", "start"]
