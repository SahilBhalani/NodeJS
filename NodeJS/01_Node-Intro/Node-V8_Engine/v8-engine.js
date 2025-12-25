/**
 * * What is the V8 Engine?
 * The V8 Engine is google's open-source JavaScript engine, used by Chrome and Node.js
 * It compiles JS to native machine code for fast execution
 */

//Check V8 Version in Node.js
console.log(`V8 versions : ${process.versions.v8}`);


//* Understanding V8's Role in Node.js
/**
 * V8 Provides the core JavaScript execution environment that node.js is built option
 * It allows Node.js to:
 * ~ Execute JavaScript code outside the browser
 * ~ Access operating system functionality (file system, networking , etc.)
 * ~ Use The same JavaScript engine that powers Chrome for consistency
 */

//Example: V8 memory Usage
const v8 = require('v8');

const heapStats = v8.getHeapStatistics();

console.log('Heap size Limit:', (heapStats.heap_size_limit / 1024 / 1024).toFixed(2), 'MB');
console.log('Total heap size:', (heapStats.total_heap_size / 1024 / 1024).toFixed(2), 'MB');
console.log('Used heap  size:', (heapStats.used_heap_size / 1024 / 1024).toFixed(2), 'MB');
