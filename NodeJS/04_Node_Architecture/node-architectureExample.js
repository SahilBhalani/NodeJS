/**
 * * What is Node.js Architecture?
 * Node.ja uses a single-threadedll, event driven archietecture that is desgined to handle many connectios at once, efficiently add without blocking the main thread.
 * 
 * This makes Node.js ideal for building scalable network applications, real time apps, and APIs
 */

//* Non-blocking Examples
 const fs = require('fs');
// console.log('Before file read');
// fs.readFile('package.json', 'utf-8' , (err , data) => {
//     if(err) throw err;
//     console.log("File contents: " , data); 
// });
// console.log('After file read');


//notice how 'After file read" is printed before the file contents, showing that node.js does not wait for the file operation to finish

//* Blocking vs Non-blocking Code
//Block code example
console.log('Start of blocking code');
const data = fs.readFileSync('newfile.txt', 'utf8'); //blocks here
console.log('Blocking operation completed');

//Non-blocking code example
console.log('start of non-blocking code');
fs.readFile('newfile.txt', 'utf8' , (err, data) => {
    if (err) throw err;
    console.log('Non-Blocking operation completed');
});
console.log('This runs before the file is read');

//* When to Use Node.JS
//node js is perticularly well-suited for:
/**
 * I/O bound applications
 * Real-time applications
 * APIs
 * Microservices  
 */ 

//* Summary

// Node.js is fast and efficient because it uses a non-blocking event loop and delegates heavy work to the system. 
// This allows it to handle thousands of connections at the same time, with minimal resources.

//* Key Benefits:
/**
 *  ~ Handles many concurrent connections efficiently
 *  ~ Great for I/O-bound applications
 *  ~ Uses JavaScript on both client and server
 *  ~ Large ecosystem of packages(npm)
 */
