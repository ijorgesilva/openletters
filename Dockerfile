FROM node:14.5.0-alpine

RUN mkdir -p /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copy the whole source folder. The dir is relative to the Dockerfile
COPY . /app/

# COPY the package.json file, update any deps and install
ADD package.json package-lock.json /app/
# RUN apt-get update && apt-get install -y python3
RUN npm update
RUN npm install
RUN npm install -g gatsby-cli

CMD ["./docker.sh"]

# Also exposing VSCode debug ports
EXPOSE 8000 9929 9230