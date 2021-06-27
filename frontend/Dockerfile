FROM node:16-alpine
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
CMD ["npm", "run", "start"]