# Use node LTS
FROM node:18

# Create app directory
WORKDIR /app

# COPY package.json
COPY package.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY src ./src
COPY index.js ./

# Expose port 3000
EXPOSE 3000

# Start the app
CMD [ "node", "index.js" ]