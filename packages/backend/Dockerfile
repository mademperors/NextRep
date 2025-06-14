# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY yarn.lock ./

# Install the application dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

EXPOSE 3000

RUN yarn build
# RUN yarn migration:run

# CMD [ "yarn", "start" ]
CMD ["sh", "-c", "yarn migration:run && yarn start:dev"]
