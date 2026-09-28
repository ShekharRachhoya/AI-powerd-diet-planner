FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm prune --omit=dev


FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app .

EXPOSE 5000

CMD ["node", "src/server.js"]