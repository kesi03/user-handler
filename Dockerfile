# Use a Node.js base image
FROM mcr.microsoft.com/playwright:v1.37.0-focal

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install

# Copy the entire project
COPY . .

# Install Playwright browsers
RUN pnpm exec playwright install --with-deps

# Expose the port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]