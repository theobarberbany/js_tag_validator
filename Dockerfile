##Node version : 
#Things that don't change closer to the top,
#things that are likely to change at the bottom
FROM node:8.9.1-alpine
ENV NPM_CONFIG_LOGLEVEL warn
#Install 'serve' to run the application
RUN yarn global add serve
#Set command to start serve
CMD serve -s build -p 3000
#Tell docker we want port 3000 exposed.
EXPOSE 3000
#Install all dependencies
COPY package.json package.json
RUN yarn install
#Copy all local files to image
COPY . .
#Build for production
RUN yarn build
