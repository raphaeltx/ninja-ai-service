# AI Service

AI Service is a RESTful API built with [NestJS](https://nestjs.com/).

## Features

- Health check endpoint (`/health`) to verify the service is running.
- Chat endpoint (`/chat`) to interact with the AI service.

## Structure

```bash
   src/
   ├── application/                     # Application layer (use cases, services)
   ├── domain/                          # Domain layer (core business logic)
   │   ├── dto/                         # Data Transfer Objects
   │   ├── entities/                    # Domain entities
   │   ├── interfaces/                  # Domain interfaces
   │   └── models/                      # Domain models
   ├── infrastructure/                  # Infrastructure layer (frameworks, tools)
   │   ├── exceptions/                  # Custom exceptions
   │   ├── guards/                      # Guards for authentication
   │   ├── strategies/                  # Authentication strategies
   │   ├── repositories/                # Data persistence logic
   │   └── strategies/                  # Stratagies configs
   ├── interfaces/                      # Interface adapters (controllers, gateways)
   │   ├── controllers/                 # HTTP controllers
   │   ├── interceptors/                # Cross-cutting concerns (e.g., logging)
   │   └── filters/                     # Exception filters
   ├── modules/                         # NestJS modules
   ├── app.module.ts                    # Root module
   ├── main.ts                          # Application entry point
   └── collection/                      # Postman collections

## Prerequisites

- **Node.js**: Version 22.11.0 or higher
- **npm** or **yarn**: Installed
- **Docker**: Installed and running

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ai-service.git
   cd ai-service
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
  # or
  yarn start:dev
  ```

- Health Check
Visit http://localhost:3000/health to verify the service is running. 