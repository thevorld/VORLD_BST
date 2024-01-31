# Stage 1: Building the code
FROM node:20.11.0 AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# List contents of /usr/src/app/dist for debugging
RUN ls /usr/src/app/dist

# Stage 2: Production environment
FROM node:20.11.0-slim 

WORKDIR /usr/src/app

# Copy package.json and package-lock.json for production
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built assets from the builder stage
COPY --from=builder /usr/src/app/dist/src ./dist

EXPOSE 8080

# Update this line to point to the correct main JavaScript file
CMD ["node", "dist/app.js"]
