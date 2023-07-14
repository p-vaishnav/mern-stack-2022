# base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# install front-end dependencies
COPY package.json ./
RUN npm install

# copy front-end source code
COPY . .

# expose PORT
EXPOSE 8000

CMD ["npm", "run", "start"]

