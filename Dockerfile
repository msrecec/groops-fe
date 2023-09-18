FROM node:16.20.1
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# install and app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@16.2.0
# add app
COPY . /app
