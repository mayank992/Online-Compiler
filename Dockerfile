# Grab the latest alpine image
FROM alpine:latest

# Install dependencies
RUN apk add --no-cache build-base nodejs npm 

# Copy our code 
WORKDIR /app
COPY . .

ENV GENERATE_SOURCEMAP=false

RUN npm install
RUN npm run client

CMD ["npm", "run", "start"]