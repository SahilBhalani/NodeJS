// * Environment Variables
//Environment variables are key-value pairs that configure your application's behaviour in different environments.

//* Accessing Environment Variables
//Get a specific enivronment variable
const apiKey = process.env.API_KEY;

//Set a default value if not defined
const port = process.env.PORT || 3000;

// Check if running in production
const isProduction = process.env.NODE_ENV === 'production';

//List all environment variables
console.log('Environment variables:', process.env);

// Load environment variables from .env file
require('dotenv').config();

//Now you can access variables from .env
console.log('Database URL:', process.env.DATABASE_URL);

// * Child Processes
//Node.js can run system commands and other scripts using the child_process module.

// ? 1. Execute a simple Command
const { exec } = require('child_process');

try {
    exec('ls -la', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`stdeerr: ${stderr}`);
            return;
        }
        console.log(`Output: ${stdout}`);
    });
} catch (error) {
    console.log('Error:', error.message);
}

// ? 2. Using spawn for Large Output
const { spawn } = require('child_process');

//Better for large data output
const child = spawn('find', ['/', '-type', 'f']);
child.stdout.on('data', (data) => {
    console.log(`Found file: ${data}`);
});
child.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
});
child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
})

//* Process Monitoring and Performance
// ? 1. Memory Usage
// Get memory usage in MB
function getMemoryUsage() {
    const used = process.memoryUsage();
    return {
        rss : `${Math.round(used.rss /1024 / 1024 * 100) / 100}MB`,
        heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100}MB`,
        heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100}MB`,
        external: `${Math.round(used.external / 1024 / 1024 * 100) / 100}MB`
    };
}

//Monitor memory usage every 5 seconds
setInterval(() => {
    console.log('Memory usage:', getMemoryUsage());
}, 5000);

// ? 2. CPU Usage
const startUsage = process.cpuUsage();

//Do some CPU-intensive work
for(let i = 0; i < 1000000000; i++){}

const endUsage = process.cpuUsage(startUsage);
console.log('CPU usage (user):', endUsage.user / 1000, 'ms');
console.log('CPU usage (system):', endUsage.system / 1000, 'ms');
