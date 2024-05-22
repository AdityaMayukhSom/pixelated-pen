FROM node:20-slim AS build
ENV HOST=0.0.0.0
WORKDIR /app
ADD package*.json .
RUN npm ci
COPY . .
CMD [ "npm", "run", "dev" ]