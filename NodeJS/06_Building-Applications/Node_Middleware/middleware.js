//* Node.js Middleware
/**
 * Middleware is a key aprt of Node.js web applications, perticularly in Express.js
 * It provides a way to add and reuse common functionality across your application's routes and endpoints
 *
 * ? Key Characteristics of Middleware
 * ~ Executes during the request-response cycle
 * ~ Can modify request and response cycle
 * ~ Can end the request-response cycle
 * ~ Can call the next middleware in the stack
 * ~ Can be application-level, router-level, or route-sepcific
 *
 * It acts as a bridge between the raw request and the final intented route handler
 *
 * At its core, middleware is a function that has access to:
 * ~ The request object(req)
 * ~ The response object(res)
 * ~ The next middleware function in the application's request-response cycle
 *
 * Middleware fuctions can perform a variety of tasks
 * ~ Execute any code
 * ~ Modify request and response objects
 * ~ End the request-response cycle
 * ~ Call the next middleware function in the stack
 */

//* How Middleware Works in the Request-Response Cycle
/**
 * Middleware functions are executed in the order they are defined, Creating a pipeline through which requests flow.
 *
 * Each middleware functions can perform operations on the request and response objects and decide whether to pass control to the next middleware or end the request-response cycle.
 */

//The basic pattern of middleware in Express.js follows this structure:

//* Ex. A Simple Middleware Chain
const express = require('express');
const app = express();

//First Middleware
app.use((req, res, next) => {
    console.log('Middleware 1: This always runs');
    next();
});

//Second middleware
app.use((req, res, next) => {
    console.log('Middleware 2: This also always runs');
    next();
});

//Route handler
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//* Application-Level Middleware
//Application-Level middleware is bound to the Express application instance using app.use() ot app.METHOD() functions
/**
 * Use Cases: Logging, Authentication, request parsing, and other operations that should run for every request
 *
 * Best Practices: Define application-level middleware before defining routes to ensure they run in the correct order.
 *
 * Bound to the application instance using app.use() or app.METHOD()
 */

//Application-level middleware
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});



//* Router-Level Middleware
/**
 * Router-level middleware works similarly to application-level middleware but is bound to an instance of express.Router().
 *
 * Use Cases: Grouping route-specific middleware, API versioning, and organizing routes into logical groups.
 *
 * Advantages: Better code organizations, modular routing, and the ablitiy to apply middleware to specific route groups
 */

//Router-level middleware
const router = express.Router();
router.use((req, res, next) => {
    console.log('Router specific middleware');
    next();
});

router.get('/users/:id', (req, res) => {
    res.send('User profile');
});

// Add the router to the app
app.use('/api', router);

//* Error-Handling Middleware
//Error-handling middleware is special because it takes four parameters instead of three: (err,req,res,next).

//Basic Error Handler
// Regular route that might throw an error
app.get('/error-demo', (req, res, next) => {
    try {
        //Simulate an error
        throw new Error('Something went wrong!');
    } catch (error) {
        next(error);
    }
});

//Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'An error occurred',
        error:
            process.env.NODE_ENV === 'production'
                ? {}
                : {
                      name: err.name,
                      message: err.message,
                      stack: err.stack,
                  },
    });
});

//* Handing Async Errors
//For async middleware, make sure to catch promise rejections and pass them to next();

//Async middleware with proper error handling
app.get('/async-data', async (req, res, next) => {
    try {
        const data = await fetchDataFromDatabase();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

//Alternative using Express 4.16+ wrapper
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

app.get(
    '/better-async',
    asyncHandler(async (req, res) => {
        const data = await fetchDataFromDatabase();
        res.json(data);
    })
);

//* Middleware Execution Order
// The order in which middleware is defined matters significantly
//Express executes middleware in the order they are added to the application

// This middleware will run first
app.use((req,res,next) => {
    console.log('First middleware');
    next();
});

// This middleware will run for /users paths only
app.use('/users',(req,res,next) => {
    console.log('Users middleware');
    next();
})

// This route handler will run when matched
app.get('/users', (req,res) => {
    res.send('Users list');
})

// This middleware will never run for successfully matched routes
// because route handlers end the request-response cycle
app.use((req, res, next) => {
  console.log('This will not run for matched routes');
  next();
});

//This is a "Catch-all" middleware for unmatched routes
app.use((req,res) => {
    res.status(404).send('Not found');
})




//* Best Practices for middleware order:
 /**
  * 1. Place middleware that applies to all requests first(logging, security. body parsing)
  * 2. Place more specific middleware and routes next
  * 3. Place Error-Handling middleware last
  */

 // TODO: Example - Recommended Order
 //1. Application-wide middleware
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(morgan('dev'));
 app.use(helmet());

 //2. Route-specific middleware
 app.use('/api', authenticate);

 //3. routes
 app.use('/api/users',userRoutes);
 app.use('/api/products',productRoutes);

 //4. 404 handler
 app.use((req,res) => {
    res.status(404).json({ message: 'Not found' });
 });

 // 5. Error handler(always last)
 app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Server error'});
 })

 app.listen(8080, () => {
    console.log(`Server running on port http://localhost:8080`);
});


