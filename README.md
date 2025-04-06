Collecting workspace information```markdown
# Ninja AI Service

Ninja AI Service is a RESTful API built with [NestJS](https://nestjs.com/). It includes a health check endpoint and is designed to be lightweight, scalable, and easy to deploy using Docker.

## Features

- Health check endpoint (`/health`) to verify the service is running.
- Dockerized for easy deployment.

## Prerequisites

- **Node.js**: Version 22.11.0 or higher
- **npm** or **yarn**: Installed
- **Docker**: Installed and running

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ninja-ai-service.git
   cd ninja-ai-service
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Application

- Start the application in development mode:
  ```bash
  npm run start:dev
  ```

- Build and run the application in production:
  ```bash
  npm run build
  npm run start:prod
  ```

- Using Docker:
  ```bash
  docker-compose up
  ```

## Health Check

Visit `http://localhost:3000/health` to verify the service is running.
```