ARG NODE_VERSION=21.7.3

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

# set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build app
RUN npm run build && npm run generate

ENV PORT=$PORT

RUN npm prune
CMD [ "npm", "run", "dev" ]
