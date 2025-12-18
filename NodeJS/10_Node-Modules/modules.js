// * Core Built-in Modules
// Node.js provides several built-in modules that are compiled into the binary
// To use any built-in module, use the require() function:

//* ex. HTTP Module
const http = require('http');
// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.end("Hey There! Sahil Here");
//   })
//   .listen(8080);

//* Creating and Exporting Modules
//In Node.js, any file with a .js extention is a module. You can export functionality from a module in several ways:

// ? 3. Using Your Modules
//import and use your custom modules using require() with a relative or absolute path:
const path = require('path');

//Importing custom modules
const { getCurrentDate, formatCurrency } = require("./utils");
const Logger = require("./logger");

//Create a logger instance
const logger = new Logger('App');

///Create Server
const server = http.createServer((req, res) => {
  try {
    logger.log(`Request received for ${req.url}`);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Welcome to our app!</h1>`);
    res.write(`<p>Current date: ${getCurrentDate()}</p>`);
    res.write(`<p>Formatted amount: ${formatCurrency(99.99)}</p>`);
    res.end();
  } catch (error) {
    logger.error(error);
    res.writeHead(500, {'Content-Type' : 'text/plain'});
    res.end('Internal Server Error');
  }
});

//Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    logger.log(`Server running at http://localhost:${PORT}`)
});
