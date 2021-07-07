# Dockerfile

# Use node alpine as it's a small node image
FROM node:alpine

RUN mkdir /app
# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY package*.json .

# Install dependencies in /app
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

# Run yarn dev, as we would via the command line 
CMD ["yarn", "dev"]