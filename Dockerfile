FROM soilfish/wcf-component-lib:1.0.2 AS base

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy the rest of the application code
COPY . .

# Link the component library
RUN npm link wcf-component-lib

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS production

# Set the working directory in the container
WORKDIR /usr/app

# Copy the build output and necessary files from the base stage
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/next.config.mjs ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static

RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
