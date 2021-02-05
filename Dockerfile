FROM node:10.16.3
RUN apt-get update
RUN apt-get --assume-yes install vim

RUN mkdir -p /usr/src/dynamic-element
WORKDIR /usr/src/dynamic-element

COPY package.json /usr/src/dynamic-element
RUN npm install

COPY . /usr/src/dynamic-element

ENTRYPOINT ["npm","run","start"]
