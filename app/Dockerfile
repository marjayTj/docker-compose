FROM node:24-alpine

WORKDIR /app

COPY app.js .

RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", "app.js"]
