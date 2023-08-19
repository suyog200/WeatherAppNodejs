FROM node:18.16.0

COPY package.json package-lock.json /app/
COPY index.js /app/
COPY home.html /app/

WORKDIR /app

RUN npm install

CMD ["node", "index.js"]

