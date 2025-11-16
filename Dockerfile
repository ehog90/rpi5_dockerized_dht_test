FROM node:20.19.0-alpine3.20 AS base

FROM base AS test_image

WORKDIR /app

RUN apk --no-cache add --virtual \
    .builds-deps \
    build-base \ 
    git
RUN apk --no-cache add linux-headers \
    py3-setuptools \
    bluez-deprecated \
    gd \
    gd-dev \
    libgd \
    ffmpeg \
    imagemagick \
    freetype \ 
    freetype-dev \ 
    libpng-dev \
    jpeg-dev \
    libjpeg \
    libjpeg-turbo-dev \
    tzdata \
    python3 \
    fontconfig \ 
    ttf-freefont \
    terminus-font \
    v4l-utils \
    util-linux \
    libgpiod \
    libgpiod-dev \
    raspberrypi-utils-vcgencmd

RUN git clone https://github.com/fsphil/fswebcam.git

WORKDIR /app/fswebcam
RUN /bin/sh ./configure --prefix=/usr
RUN make && make install

RUN echo "Europe/Budapest" >  /etc/timezone && cp /usr/share/zoneinfo/Europe/Budapest /etc/localtime

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm pkg delete dependencies.node-dht-sensor || true && \
    npm pkg delete devDependencies.node-dht-sensor || true

RUN npm ci
RUN npm install node-dht-sensor --use_libgpiod=true

RUN npm prune --production

RUN apk del \
    .builds-deps \
    build-base \ 
    git
CMD ["sh", "-c", "node index.js"]