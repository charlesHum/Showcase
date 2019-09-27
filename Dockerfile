FROM node:12.2.0

# set working directory
WORKDIR /showcase

# add `/app/node_modules/.bin` to $PATH
ENV PATH /showcase/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /showcase/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

# add app
COPY . /showcase

# start app
CMD ng serve --host 0.0.0.0
