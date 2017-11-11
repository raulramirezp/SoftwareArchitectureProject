FROM node:6.11.1
RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/EventsFrontApp
RUN mkdir $HOME
WORKDIR $HOME

RUN npm install -g @angular/cli@latest
COPY package.json $HOME/package.json
RUN npm install && npm cache clean
COPY . /EventsFrontApp

EXPOSE 4200
EXPOSE 49153

CMD ["npm", "start", "--host=0.0.0.0"]
