FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
curl

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash && \
apt-get install -y nodejs && \
apt-get install -y build-essential

RUN apt-get install -y ruby-full && \
gem install sass && \
gem install compass

RUN mkdir -p /app

RUN npm install -g yarn

COPY package.json /app/package.json

ADD ./start.sh /start.sh

RUN cd /app

WORKDIR /app

ENTRYPOINT ["/start.sh"]

CMD ["yarn", "start"]
