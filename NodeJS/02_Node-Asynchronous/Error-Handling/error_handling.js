//* Common Error Types in Node.js
//Understanding different error types helps in handlinh them appropriately:

//1. Standard JavaScript Errors
//SyntaxError
//JSON.parse('{invalid json}');

//TypeError
//null.someProperty;

//ReferenceError
//unknownVariable;

//2. System Errors
//ENOENT: No such files or directory
const fs = require('fs');
fs.readFile('nonexistence.txt', (err) => {
    console.error(err.code);
});

//ECONNREFUSED: Connection refused
const http = require('http');
const req = http.get('http://nonexistent-site.com', (res) => {});
req.on('error', (err) => {
    console.error(err.code);
});

//* Basic Error Handling
//Node.js follows several Patterns for error handling:

//? 1. Error-First Callbacks
//The most common pattern in Node.js core modules where the first argument to a callback in an error objecr (if any occured).
function readConfigFile(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if(err) {
            if(err.code === 'ENOENT') {
                return callback(new Error(`config file ${filename} not found`));
            } else if(err.code === 'EACCESS') {
                return callback(new Error(`No permission to read ${filename}`));
            }
            return callback(err);
        }

        try {
            const config = JSON.parse(data);
            callback(null, config);
        } catch (parseError) {
            callback(new Error(`Invalid JSON in ${filename}`));
        }
    });
}

//Usage
readConfigFile('config.json', (err, config) => {
    if(err) {
        console.error('Failed to read config:' , err.message);
        return;
    }
    console.log('Config loaded successfully:', config);
});

// ? 2. Modern Error Handling 
//Using try..catch with async/await
//wit hasync/await, you can use try/catch blocks for both synchronous and asynchronous code:

async function loadUserData(userId) {
    try {
        const data = await fs.readFile(`users/${userId}.json`, 'utf8');
        const user = JSON.parse(data);

        if(!user.email) {
            throw new Error('Invalid user Data: missing Email');
        }

        return user;
    } catch (error) {
        //Handle differet error types
        if(error.code === 'ENOENT') {
            throw new Error(`User ${userId} not found`);
        } else if(error instanceof SyntaxError) {
            throw new Error('Invalid user data format')
        }

        throw error;
    } finally {
        console.log(`Finished processing user ${userId}`);
    }
}


//Usage 
(async () => {
    try {
        const user = await loadUserData(123);
        console.log('User loaded:', user);
    } catch (error) {
        console.error('Failed to load user:' , error.message);
        //Handle Error (e.g show to user, retry, etc.)
    }
})();

//* Global Error Handling 
//uncaught Exceptions
//For unexpected error, you can listen for uncaughtException to perform cleanup before existing:
process.on('uncaughtException' , (error) => {
    console.error('UNCAUGHT EXCEPTION! Shutting down...');
    console.error(error.name, error.message);

    //perform cleanup (close database connections, etc)
    server.close(() => {
        console.log('Process terminated due to uncaught exception');
        process.exit(1);
    });
});

//Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION! Shutting Down...');
    console.error('Unhandled Rejection at: ', promise, 'Reason:', reason);

    //close server and exit
    server.close(() => {
        process.exit(1);
    });
});

///Example of an unhandled promise rejection
Promise.reject(new Error('Something went wrong'));

//Example of an uncaught exception
setTimeout(() => {
    throw new Error('Uncaught exception after timeout')
}, 1000);

//* Custom Error Types:
class ValidationError extends Error{
    constructor(message, field){
        super(message);
        this.name = 'ValidationError';
        this.field = field;
        this.statusCode = 400;
    }
}

class NotFoundError extends Error {
    constructor(resource) {
        super(`${resource} not found`);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

//Usage
function getUser(id){
    if(!id){
        throw new ValidationError('User ID is required', 'id')
    }
    //...
}