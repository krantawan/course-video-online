
# Course Video Online

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Course Video Online is a web application designed to provide an online platform for managing and viewing course videos. It allows users to authenticate using Google OAuth and manage their courses seamlessly.

## Features
- User authentication with Google OAuth
- Credential-based login
- Course management
- Video streaming

## Technologies Used
- **Next.js 14**: A React framework for production
- **NextAuth**: Authentication for Next.js
- **Tailwind CSS**: Utility-first CSS framework
- **Prisma**: Next-generation ORM
- **PostgreSQL**: Open-source relational database
- **Docker Compose**: Tool for defining and running multi-container Docker applications

## Installation
### Prerequisites
- Node.js
- Docker
- Docker Compose

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/krantawan/course-video-online.git
    cd course-video-online
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create an `.env` file based on the `.env.example` file and configure the environment variables.

4. Start the application using Docker Compose:
    ```bash
    docker-compose up
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage
1. Sign in using your Google account
2. Manage your courses by adding, editing, or removing course videos.
3. View and stream course videos directly from the platform.


