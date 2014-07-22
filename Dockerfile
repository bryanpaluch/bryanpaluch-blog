#
# bryanpaluch-blog Dockerfile


# Pull base image.
FROM dockerfile/nodejs

RUN mkdir /opt/bryanpaluch-blog

WORKDIR /opt/bryanpaluch-blog

ADD . /opt/bryanpaluch-blog/

RUN npm install

EXPOSE 3001

CMD ["node", "/opt/bryanpaluch-blog/server.js"]


