const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Joi = require('joi')

const { errorHandler } = require('./middleware/errorMiddleware');
const { AppError } = require('./utils/errorHandler');

const app = express();
app.use(express.json());

//Swagger configurations
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'A simple Express User API',
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js', './app.js'], // include where comments exist
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Returns a list of users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Ping test
 *     responses:
 *       200:
 *         description: pong
 */
app.get('/ping', (req, res) => res.send('pong'));

// Validation schema
// const userSchema = Joi.object({
//      id: Joi.number().integer().required(),
//     name: Joi.string().min(3).required(),
//     email: Joi.string().email().required(),
//     age: Joi.number().integer().min(18).max(120)
// });


const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

//This route throws a custom errors
app.get('/api/error-demo', (req, res, next) => {
    next(new AppError(404, 'Resource not found hehe!'));
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;