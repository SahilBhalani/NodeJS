//data-loader.mjs
//This would cause an error in CommonJS or in a Script 
//But works at the top level in ES Modules

console.log('Loading Data...');


//Top-Level Await - the module's execution pauses here
const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
const data = await response.json();

console.log('Data Loaded');

export {data};

//When another module imports this one, it will only get the exports 
//after all the top level await operations have completed

/**
 * * Top Level await is especially useful for:
 * ~ Loading configurations from files or remote sources
 * ~ Connecting to Databases before exporting functionalities
 * ~ Conditional imports or modules initialization
 */

//!------------------------------------------------------------------

//* Best Practices
//When working with ES Modules in Node.js, follow these best practices:

// ? 1. Be Clear About File Extensions
//Always include file extensions in your import statement for local files:

//good
import { someFunction } from './utilss.mjs';

//bad - might be not work depending on configurations
import { someFunction } from './utils';

// ? 2. Use Directory Indexes Properly
// for directory imports, create index.mjs files:

//utils/index.mjs
export * from './string-utils.mjs';
export * from './number-utils.mjs';

//app.mjs
import { formatStrings, add } from './utils/index.mjs';

//? 3. Choose the right Export Style
//use named exports for multiple functions/values, and default exports for main functionality:

//for libraries with many utilities, use named exports
export function validate() { /*...*/}
export function format() { /*...*/}

//for components or classes that are the primary export
export default class UserService{/*...*/}

// ? 4. Handle the Transition From CommonJS
//When working with a codebase that mixes CommonJS and ES Modules:
/**
 * ~ ESM can import from CommonJS modules using default import
 * ~ CommonJS can require() ES Modules only with dynamic import()
 * ~ Use the Compatibility helpers im the Node.js 'Module' package for interoperability
 */

//Importing CommonJS module from ESM
//In a CommonJS module:
(async () => {
    const {default: myEsmModule} = await import('./my-esm-module.mjs');
})();

