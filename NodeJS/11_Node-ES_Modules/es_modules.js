{
  // * Example: Common Js Modules
  const math = require("./math");
  console.log(math.add(5, 3));
}

//* Example: ES Modules
import { add, subtract } from "./math.mjs";
console.log(add(5, 5));
console.log(subtract(5, 3));

//? NOTE: if you're working with a codebase that primarily uses CommonJS but you want to use ES Module in one file, using the .mjs extension is the most explicit and least error-prone approach.


//* Import and Export Syntax
//ES Modules provide more flexible ways to import and export code compared to CommonJS

// * Export Syntax

//? 1. Named Exports
//multiple named imports
export function sayHello() {
    console.log('Hello');
}

export function sayGoodbye() {
    console.log('Goodbye');
}

//Alternative: Export list at the end
function add1(a,b) {
    return a + b;
}

function subtract1(a,b) {
    return a-b;
}

export {add, subtract};

//* Default Export
//only one default export per module
export default function(){
    console.log('I am the default export');
}

//or with a named fucntion/class/object
function mainFuntion(){
    return 'Main Functionality';
}
// export default mainFunction;


//* Mixed Export
//combining default and named exports
export const VERSION = '1.0.0';

function main() {
    console.log('Main Function');
}

//export {main as default}; //alternative way to set default

//* Import Syntax

//* Importing Named Exports
//Importing specific named exports
//import {sayHello, sayGoodbye} from './greetings.mjs';

//Rename imports to avoid naming conflicts
import {add as sum, subtract as minus} from './math.mjs';
console.log(sum(5,3));

//Import all named exports as an object
import * as math from './math.mjs';
console.log(math.add(7,4)); //11

//* Importing Default Exports
//Import the default export
import mainFunction from './main.mjs';
mainFunction();

//You can name the default import anything you want
import anyNameYouWant from './main.mjs';
anyNameYouWant();

//* Importing Both Default and Named Exports
//Import both default and named exports
//import main, {VERSION} from './main.mjs';
console.log(VERSION); //1.0.0
main(); // Main function


//* Dynamic Imports
// ES modules support dynamic imports, allowing you to load modules conditonally or on-demand.

//* ex. Dynamic imports
//async Imports
//app.js
async function loadModules(moduleName) {
    try {
        const module = await import(`./${moduleName}.mjs`);
        return module;
    } catch (error) {
        console.error(`Failed To load ${moduleName}.mjs`);
    }
}

//Load a module based on conditions
const moduleName = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

loadModules(moduleName).then(module => {
    module.default(); // call the default export
});

// Or with simpler await syntax
(async () => {
    const mathModule = await import('./math.mjs');
    console.log(mathModule.add(10,5)); //15
});

// ? Use Case : Dynamic imports are great for code-splitting, lazy-loading modules, or conditionally loading modules based on runtime conditions


