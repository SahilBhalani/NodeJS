//* Node.js Frameworks

// * Express.js
//Express is the most popular and widely used Node.js framewoek , know for its simplicity and flexibility
/**
 * Ideal For: Building web applications and APIs of any size
 * Learning Curve: Low to Moderate
 * Performance: Good for most use cases
 * Ecosystem: Largest in the Node.js ecosystem
 */

const express = require('express');
const { request } = require('node:http');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello World from Express.js!');
});

app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}`);
});

/**
 * Key Features:
 * ~ Minimal and flexible web frameworks
 * ~ Robust routing system
 * ~ HTTP utilities and middlware
 * ~ Template engine support
 * ~ Serves as the foundation for many other frameworks
 *
 * Best For: General-Purpose web applications, APIs, and as a foundation for more specialized frameworks
 */

//* Fastify
/**
 * Fastify is a web framework focused on providing the best developer experience with minimal overhead and maximum performance.
 * Ideal for: High-Performance APIs and Service
 * Learning Curve: Low to Moderate
 * Performance: One of the fastest Node.js frameworks
 * Ecosystem: Growing, with good plugin support
 */

const fastify = require('fastify')({ logger: true });
const port2 = 8081;

//Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'Hello World from Fastify!' };
});

//Run the Server
const start = async () => {
    try {
        await fastify.listen({ port2 });
        fastify.log.info(`Fastify server running at http://localhost:${port2}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();


//* Koa.js
//* Hapi.js
//* Adonis.js
//* Socket.io
//* Meteor
//* Loopback


//* API-Focused Frameworks
//* Restify
//* Strapi


//!----------------------------------------------------------------
// * Getting Started With a Framework

// Basic Project Setup Example(Express)

/**
 * # Create a new project directory
 * mkdir my-express-app
 * cd my-express-app
 * 
 * # Initialize npm and install Express
 * npm init -y
 * npm install express
 * 
 * # Create main application file (app.js)
 * touch app.js
 */

//* Project Structure Best Practices
/**
 * my-express-app/
├── node_modules/ # Dependencies
├── config/ # Configuration files
│ ├── db.js # Database configuration
│ └── env.js # Environment variables
├── controllers/ # Route controllers
├── models/ # Database models
├── routes/ # Route definitions
├── middleware/ # Custom middleware
├── public/ # Static files
├── tests/ # Test files
├── .env # Environment variables
├── .gitignore # Git ignore file
├── app.js # Application entry point
└── package.json # Project configuration
 * 
 */
