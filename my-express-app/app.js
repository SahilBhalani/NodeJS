// * What is Express.js?
/**
 * Express.js is the most popular Node.js web aaplication framework, designed for building web applications and APIs
 * It's often called the de facto standard server framework for Node.js
 *
 * Key Characteristics
 * ~ Minimal and flexible
 * ~ Unopinionated (you decide how to structure your app)
 * ~ Lightweight and fast
 * ~ Extensible through middleware
 * ~ Huge ecosystem of plugin and extensions
 */

//TODO: Express Example
const express = require('express');
const app = express();
const port = 8080;

//Define a route for GET requests to the root URL
// app.get('/', (req, res) => {
//   res.send('Hello World from Express!')
// })

// Start the server
// app.listen(port, () => {
//     console.log(`Exaple app listening at http://localhost:${port}`);
// })

//* Basic Routing
//Routing Refers to how an application responds to client to specific endpoints (URIs) using different HTTP methods (GET, POST,PUT,DELETE, etc.)
//Express provides simple methods to define routes that corresponds to HTTP methods:
/**
 * * app.get() - Handle GET Requests
 * * app.post() - Handle POST Requests
 * * app.put() - Handle PUT Requests
 * * app.delete() - Handle DELETE Requests
 * * app.all() - Handle all HTTP methods
 */

//Respond to GET requests on the root route
// app.get('/', (req, res) => {
//   res.send('GET request to the homepage')
// });

// Respond to GET request on the /about route
app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/contact', (req, res) => {
    res.send('Contact Page');
});

//Route with HTML response
app.get('/html', (req, res) => {
    res.send(`
        <html>
        <head>
        <title>Express Routing</title>
        <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: red; }
          p { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>HTML Response from Express</h1>
        <p>This response was sent using Express routing.</p>
        <p>Try other routes: <a href="/">/</a> | <a href="/about">/about</a> | <a href="/contact">/contact</a></p>
      </body>
    </html>
        `);
});

//Start the server
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// })

//* Route Parameters
//Route parameters are named URL segments that coptures values at specific positions in the URL.
//They are specified in the path with a colon: prefix
//ex. /users/:userID/books/:bookId
//in This example, usreID and bookId are route parameters that can be accessed via req.params

// Route with URL parameters
app.get('/users/:userId', (req, res) => {
    res.send(`User profile for ID: ${req.params.userId}`);
});

// Route with multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
    res.send(`
        <h2> User and Post Information:</h2>
        <p>User ID: ${req.params.userId}</p>
        <p>Post ID: ${req.params.postId}</p>
        `);
});

//* Query Parameters
//Query parameters are kry-value pairs that appear after the ? in a url.
//They are automatically parsed by Express and available in req.query

//Route Handling query parameters
app.get('/search', (req, res) => {
    //Access query parameters using req.query
    const { q, category } = req.query;
    res.send(`Search query: ${q}, Category: ${category || 'none'}`);
});

//!-------------------------------------------------------------------
// * Middleware in Express
//Middleware functons are the backbone of Exrpress applications.

//They have access to:
/**
 * ~ The request object(req)
 * ~ The response object(res)
 * ~ The next middleware function in the stack(next)
 */

//Middleware can:
/**
 * ~ Execute any code
 * ~ Modify request and response objects
 * ~ End the request-response cycle
 * ~ Call the next middleware in the stack
 */

//* Built-in Middleware
/**
 * Express includes several useful middleware functions
 * ~ express.json() - Parse JSON request bodies
 * ~ express.urlencoded() - Parse URL-encoded request bodies
 * ~ express.static() - Serve static files
 * ~ express.Router() - Create modular route handlers
 */

//Middleware to parse JSON request bodies
app.use(express.json());

//Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

//Middleware to serve static files from a directory
app.use(express.static('public'));

// post route that uses JSON middleware
app.post('/api/users', (req, res) => {
    //req.body contains the parsed JSON data
    console.log(req.body);
    res.status(201).json({ message: 'User created', user: req.body });
});

//* Error Handling in Express
//Error Handling in Express in done through special middleware functions that have four arguments:
// (err , req, res, next)

/**
 * Key Points
 * ~ Error-Handling middleware must have four arguments
 * ~ It should be defined after other app.use() and route calls
 * ~ You can have multiple error-handling middleware functions
 * ~ User next(err) to pass errors to the next error handler
 *
 * Express comes with a default error handler to catch errors that occur during request processing:
 */

//Route that may throw an error
app.get('/error', (req, res) => {
    //Simulating an error
    throw new Error('Something went wrong!');
});

//Route that uses next(error) for asynchronous code
app.get('/async-error', (req, res, next) => {
    //Simulating an asynchronous operations that fails
    setTimeout(() => {
        try {
            //Something that might fail
            const result = nonExistentFunction(); //This will throw an error
            res.send(result);
        } catch (error) {
            next(error); // pass errors to express
        }
    }, 100);
});

//Custom error handling middleware
//Must have four parameters to be recognized as an error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//* Server Static Files
// Express can serve files like images,CSS, and JavaScript using the built-in express.static middleware
/**
 * Best Practices:
 * ~ Place static files in dedicated directory(commonly public or static)
 * ~ Mount the static middleware before your routes
 * ~ Consider using a CDN in production for better performance
 * ~ Set appropriate cache headers for static assets
 *
 * To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function
 */

//Serve static files from the 'public' directory
app.use(express.static('public'));

//You can also specify a virtual path prefix
app.use('/static', express.static('public'));

// Using absolute path (recommended)
// app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/ss', (req, res) => {
    res.send(`
    <h1>Static Files Example</h1>
    <img src="/images/logo.png" alt="Logo">
    <link rel="stylesheet" href="/css/style.css">
    <script src="/js/script.js"></script>
    `);
});

//* Routing in Separate Files
// For better organization, you can define routes in seperate files using Express Router:

const userRouter = require('./routes/users');
const productsRouter = require('./routes/products');

//Use the routers
app.use('/users', userRouter);
app.use('/products', productsRouter);

app.get('/', (req, res) => {
    res.send('Main application home page');
});

//* Template Engines
// Express can be configured with template engines to generate dynamic HTML:

//set the view engine to EJS
app.set('view engine', 'ejs');

//set the directory where templates are located
app.set('views', './views');

//Route that renders a template
app.get('/ej', (req, res) => {
    const data = {
        title: 'Express Template Example',
        message: 'Hello from EJS!',
        items: ['Item 1', 'Item 2', 'Item 3'],
    };

    //Renders the views/index.ejs template
    res.render('index', data);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
