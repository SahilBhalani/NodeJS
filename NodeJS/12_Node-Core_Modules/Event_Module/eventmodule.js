//* Node.js Event Module

// Core Concepts of Events in Node.js
//Every action on a computer is an event, like when a connection is made or a file is opened.

//Objects in Node.js can fire events, like the readStream object fires events when opening and closing a file:

const fs = require('fs');
const rs = fs.createReadStream('C:\\Node\\myfile.txt');
rs.on('open', function () {
    console.log('The file is open');
});

// * Getting Started with Events in Node.js
//Node.js uses an event-driven architecture where objects called "emitters" emit named events that cause function objects("listeners") to be called.

//Ex.

//Import the events module
const EventEmitter = require('events');

//Create an Event emitter instance
const myEmitter = new EventEmitter();

// Register an event listener
myEmitter.on('greet', () => {
    console.log('Hello There!');
});

//Emit the event
myEmitter.emit('greet');

//* EventEmitter Clas
// The EventEmiiter class in fundamental to Node.js's event-driven archiecture.
// It provides the ability to create and handle custom events.

//*  Creating an Event Emitter
//To Use the EventEmitter, you need to create an instance of it:
const evnts = require('events');
const eventEmitter = new evnts.EventEmitter();

//Create an event handler
let myEventHandler = function () {
    console.log('I Hear a scream!');
};

//Assign the event handler to an event"
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
eventEmitter.emit('scream');

//!------------------------------------------------------------------

//* Common EventEmitter Patterns

// ? 1. Passing Arguments to Event Handlers
const emitter = new  EventEmitter();

//Emit event with arguments
emitter.on('userJoined', (username, userId) => {
    console.log(`${username} (${userId}) has joined the chat`);
});

emitter.emit('userJoined', 'JohnDoe', 42);

// ? 2. Handling Events Only Once

// This listener will be called only once
emitter.once('connection', () => {
    console.log(`First connection established`);
});

emitter.emit('connection');
emitter.emit('connection')

// ? 3. Error Handling 

//Always handle 'error' events
emitter.on('error', (err) => {
    console.error('An Error occured:', err.message);
});

emitter.emit('error', new Error('Something went wrong'));

//!------------------------------------------------------------------

//* Best Practices

// ? 1. Use Named Functions for Better Stack Traces

//Instead of anonymous functions
function handleData(data) {
    console.log('Received data:', data);
  }

  myEmitter.on('data', handleData);

// ? 2. Clean Up Listeners
//Add a listener
const listener = () => console.log('Event Occured');
myEmitter.on('event', listener);

//Later, remove the listener when no longer needed
myEmitter.off('event', listener)