# Node.js Docker Setup with Knex.js Migrations

## Overview
This project is set up to run inside a Docker container using Node.js. It includes database migrations with Knex.js.

## Prerequisites
Ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [Knex.js](https://knexjs.org/) (for database migrations)

## Getting Started

### 1. Clone the Repository
```sh
git clone <repository-url>
cd <project-directory>
```

### 2. Configure Environment Variables
Create a `.env` file with your database configuration:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
```

### 3. Build and Run the Docker Container
```sh
docker build -t node-app .
docker run -p 3000:3000 --env-file .env node-app
```

### 4. Running Knex.js Migrations

#### Install Knex CLI (if not installed globally)
```sh
npm install -g knex
```

#### Run Migrations
```sh
knex migrate:latest
```

#### Rollback Migrations
```sh
knex migrate:rollback
```

### 5. Accessing the Application
Once the container is running, the application should be accessible at:
```
http://localhost:3000
```

