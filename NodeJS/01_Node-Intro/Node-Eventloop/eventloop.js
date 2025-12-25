// * What is event loop?
/**
 *  The Event loop is what makes node js non-blocking and efficient.
 * it handles through asynchronous operations by delegating task to the system and processing their results through callbacks, allowing node js to manage thousands of concurrent connections with a single thread 
 */


//* How the Event Loop Works
/**
 * Node Js Follows these steps to handle operations
 * 1. Execute the main script (synchronous code)
 * 2. Process any microtasks (Promises, process.nextTick)
 * 3. Execute TImers(setTimeout, setInterval)
 * 4. Run I/O callbacks(file system, network operations)
 * 5. Process setimmediate callbacks
 * 6. Handle close events(like socket.on('close')) 
 */

//* Ex. Event Loop Order
console.log('First');
setTimeout(() => console.log('third'), 0);
Promise.resolve().then(() =>
console.log('Second'))
console.log('Fourth');

/**
 * This demostrates the execution order
 * 1. Sync code run first
 * 2. Microtasks (Promises) run before the next phase('second')
 * 3. Timers execute last('Third')
 */

//* Event Loop Phase
//The event loop process different types of callbacks in this order
/**
 * 1. Timers: setTimeout, setInterval
 * 2. i/O Callbacks: Completed I/O operations
 * 3. Poll : Retrieve new I/O events
 * 4. Check: setImmediate callbacks
 * 5. Close: Cleanup callbacks(like socket.on('close'))
 * 
 * ? NOTE: Between each phase, Node.js runs microtasks(Promises) and process.nextTick callbacks
 */

//* Ex. Event Loop Phases
console.log('1. Start');

//Next Tick queue
process.nextTick(() => console.log('2. Next tick'));

//Microtask queue (Promise)
Promise.resolve().then(()=> console.log('3.Promise'));

//Timer phase
setTimeout(() => console.log('4. Timeout'), 0);

//Check Phase
setImmediate(() => console.log('5. Immediate'));

console.log('6. End');

//* Why is the event loop Important?
//The event loop enables node.js to handle thousands of concurrent connections with a single thread, making it perfect for: 
/**
 * ~ Real-time Applications
 * ~ APIs and Microservices
 * ~ Data Streaming
 * ~ Chat Applications
 */


