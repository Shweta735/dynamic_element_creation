FROM node:10.16.3
RUN apt-get update
RUN apt-get --assume-yes install vim

COPY . /usr/src/dynamic-element
WORKDIR /usr/src/dynamic-element

RUN npm rebuild

ENTRYPOINT ["npm","run","start"]
