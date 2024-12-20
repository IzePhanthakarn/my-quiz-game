FROM soilfish/wcf-component-lib:1.0.2 AS builder

# Set working directory
WORKDIR /usr/app

COPY package.json  ./
RUN npm install --ignore-scripts
COPY . .
#COPY ./tsconfig.server.json ./tsconfig.json
#
#COPY --from=ry-c4tkg-uat-tkc01-harbor.ssomgmt.go.th/wcf2/cmn/df-redux:latest /app/redux /usr/src/app/src/redux
RUN npm link wcf-component-lib

RUN npm run build

## Stage 2: Production image
FROM node:20-alpine AS production

# Install tzdata for timezone support
# RUN apk add --no-cache tzdata

# Set the timezone to Asia/Bangkok
ENV TZ=Asia/Bangkok
# Set the working directory in the container
WORKDIR /usr/app

# Copy the build output and necessary files from the base stage
#COPY --from=builder /usr/src/app/.next ./.next
#COPY --from=builder /usr/src/app/node_modules ./node_modules
#COPY --from=builder /usr/src/app/package.json ./package.json
#COPY --from=builder /usr/src/app/public ./public

COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/package-lock.json ./
#COPY --from=builder /usr/src/app/next.config.mjs ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static

RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Write the build timestamp to a file
RUN echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" > /usr/app/timestamp.txt
# Start the app
CMD ["npm", "start"]

