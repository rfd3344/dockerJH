# Use the official Node.js image
FROM node:lts AS development

# Create and set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json /app
RUN npm install

# Copy application code
COPY . /app

# Expose the port the app runs on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]
