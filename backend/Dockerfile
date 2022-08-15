FROM node:14-alpine

WORKDIR /usr/local/apps/myapp

COPY ./package*.json ./
COPY yarn.lock ./
RUN yarn install && yarn cache clean --force

ENV PATH=/usr/local/apps/myapp/node_modules/.bin:$PATH

WORKDIR /usr/local/apps/myapp/dev

COPY . .

EXPOSE 5000

CMD [ "yarn","start:watch" ]


