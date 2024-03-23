FROM node:alpine

# COPY [host machine] [container] (first path are relative to the Dockerfile, second is relative to root on the container)
COPY package.json package-lock.json ./

RUN npm install

COPY . .

# RUN npm run build

CMD ["npm","start"]