// * Node.js Process Management

//* Accessing Process Information
//The process object gives you details about and control over the current Node.js process.

//Process indentification
console.log('Process ID (PID):', process.pid);

//Platform information
console.log('Platform:', process.platfrom);
console.log('Node.js version:', process.version);

//Memory usage( in bytes)
console.log('Memory uasge:', process.memoryUsage());

//Command line arguments
console.log('Arguments:', process.argv);

//* Exiting a Process
//You can control when your Node.js program stops using these methods:

// ? 1. Normal Exit
//Exit with success (status code 0)
// process.exit();

// Or explicitly
// process.exit(0);

// ? 2. Exit with Error
//Exit with error (status code 1)
// process.exit(1)

// ? 3. Before Exit Event
//run cleanup before exiting
// process.on('beforeExit', (code) => {
//     console.log('About to exit with code:',code);
// });

// * Handling Process Events
//Node.js processes can respond to system signals and events
//Here are the most commmon ones:

// ? 1. Handling Ctrl + C (SIGINT)
//Handle Ctrl+C
process.on('SIGINT', () => {
    console.log('\nGot SIGINT, Press Control-D to exit');
})


// ? 2. Handling Process Ternimation (SIGTERM)
process.on('SIGTERM', () => {
    console.log('Received SIGTERM, Cleaning up...');
    // Perform cleanup if needed
    // process.exit(0);
})

// ? 3. Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Perform cleanup if needed
    
})

