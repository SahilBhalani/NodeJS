//* Basic Async/Await
async function getData() {
    console.log('Starting...');
    const result =  await someAsyncOperations();
    console.log(`Result: ${result}`);
    return result;
}

function someAsyncOperations(){
    return new Promise(resolve => {
        setTimeout(() => resolve('Operation Completed'), 1000);
    });
}

//call the async function
getData().then(data => console.log('Final Data: ', data));

//* Ex. Reading a File with Async/Await
const fs = require('fs').promises;
async function readFile() {
    try {
        const data = await fs.readFile('myfile.txt', 'utf8');
        console.log(data);
    } catch (error) {
        console.error('Error reading file: ', error);
    }
}
readFile();

//* Error Handling with Try/Catch
//One of the advantages of async/await is that you can use traditional try/catch blocks for error handling, making your code more readable
//Ex.
async function fetchUserData() {
    try {
        const response  =  await fetch('https://api.example.com/users/1')
        if(!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const user = await response.json();
        console.log('User Data:' , user);
        return user;
    } catch (error) {
        console.error('Error fetching user data: ', error);
        throw error;
    }
}

//You can also mix async/await with promise .catch() for different scenarios:
fetchUserData().catch(error => {
    console.log('Caught outside of async function: ', error.message);
});

//* Running Promises in Parallel
//Although async/await makes coded look synchronous, sometimes you need to run operations in parallel for better performance.
//ex: Sequential vs Parallle Operations

//helper fucntion to simualate an API Call
function fetchData(id){
    return new Promise(resolve => {
        setTimeout(() => resolve(`Data for ID ${id}`), 1000);
    });
}

// Sequential Opeations -> takes ~3 Seconds
async function fetchSequential() {
    console.time('Sequential');
    const data1 = await fetchData(1);
    const data2 = await fetchData(2);
    const data3 = await fetchData(3);
    console.timeEnd('Sequential');
    return [data1, data2, data3];
}

//Parallel operation - takes ~1 second
async function fetchParallel() {
    console.time('parallel');
    const results = await Promise.all([
        fetchData(1),
        fetchData(2),
        fetchData(3)
    ]);
    console.timeEnd('parallel');
    return results;
}

//Demo
async function runDemo() {
    console.log('Running sequentially...');
    const seqResults = await fetchSequential();
    console.log(seqResults);

    console.log('\nRunning in parallel...');
    const parResults = await fetchParallel();
    console.log(parResults);
}

runDemo();