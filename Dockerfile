# Step 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Step 2: Serve the static files with Node/Express backend
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
COPY server ./server
EXPOSE 80
ENV PORT=80
ENV NODE_ENV=production
CMD ["node", "server/server.js"]
