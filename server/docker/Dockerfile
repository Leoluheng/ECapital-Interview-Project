FROM node:lts

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json pnpm-lock.yaml ./
# Build
RUN npm install -g pnpm
RUN pnpm install

# Copy app source
COPY . .

EXPOSE 5000
CMD [ "node", "index.js" ]