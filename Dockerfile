FROM node:0.12

# work dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install bower
RUN npm install -g bower

# install node packages
COPY package.json /usr/src/app/
RUN npm install

# install bower packages
COPY bower.json /usr/src/app/
COPY .bowerrc /usr/src/app/
RUN bower install --allow-root

# copy app into work dir
COPY . /usr/src/app
RUN node_modules/gulp/bin/gulp.js build

EXPOSE 3000
CMD [ "npm", "start" ]
