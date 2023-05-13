# build step
FROM node:lts
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install
COPY . ./
EXPOSE 8080
ENV PORT=8080
CMD [ "pnpm", "start"]