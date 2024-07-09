# Dating app Clone

This project is a clone of the popular dating app Dating app. It's designed to demonstrate the capabilities of modern web technologies including Node.js, Express, and Sequelize for the backend, with a separate client-side application.

## Description

This Dating app clone aims to replicate some of the core features of Dating app, such as user authentication, and the classic swipe mechanism. It uses SQLite for data storage to keep things simple and portable.

## Getting Started

### Dependencies

- Node.js (v16 or newer recommended)

This project is built and tested on Linux, but should work on Windows with the appropriate Node.js setup.

### Installing

First, clone the repository to your local machine:

```bash
git clone https://github.com/nik3348/dating-app-demo.git
cd dating-app-demo
```

Install the necessary dependencies for both the server and the client:

```bash
npm start
cd client
npm install
```

Finally replace all ENV variables inside .env

### Running the Application
To start both the client and the server with a single command, run:

```bash
npm start
```

This will start the backend server with nodemon for live reloading, and the client application in development mode.

## Usage
After starting the application, you can access:

The backend API at: http://localhost:3000
The frontend application at: http://localhost:5173
