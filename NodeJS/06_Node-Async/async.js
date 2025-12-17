//* Sync vs Async : Differences

//Ex. Synchronous File Read
const fs = require('fs');
console.log('1. Starting sync read...');
const data = fs.readFileSync('myfile.txt' , 'utf-8');
console.log('2. File Content: ' , data);
console.log('3. Done Reading File');
//Output will be in order 1 -> 2 -> 3 (Blocks between each step)

//Ex. Asynchronous File Read
console.log('1. Starting async read..');
fs.readFile('myfile.txt', 'utf8' , (err ,data) => {
    if (err) throw err;
    console.log('2. File contents: ' , data);
});
console.log('3. Done starting read operation');
//Output Order: 1 -> 3 -> 2 (doesn't wait for file read to complete)

//* Avoiding Callback Hell
//Problem: Nested Callbacks (Callbacks Hell)
getUser(userId, (err, user) => {
    if(err) return handleError(err);
    getOrders(user.id, (err, orders) => {
        if(err) return handleError(err);
        processOrders(orders, (err) => {
            if(err) return handleError(err);
            console.log('All Done!');
        });
    });
});

//Solution: Use Promises
getUser(userId)
.then(user => getOrders(user.id))
.then(orders => processOrders(orders))
.then(() => console.log('All Done'))
.catch(handleError);

//Even Better: Async / Await
async function processUser(userId) {
    try {
        const user = await getUser(userId);
        const orders = await getOrders(user.id);
        await processOrders(orders);
        console.log("All Done!");
    } catch (error) {
        handleError(error);
    }
}

//* Modern Async Patterns
//1. Promises
console.log('1. Reading File...');
fs.readFile('myfile.txt', 'utf8')
.then(data => {
    console.log('3. File Content: ' , data);
})
.catch(err => console.error('Error: ', err));
console.log('2. This runs before file is read');

//2. Async/Await(Recommended)
async function readFiles(){
    try {
        console.log('1. Starting to read files...');
        const data1 = await fs.readFile('myfile.txt', 'utf8');
        console.log('2. Files read Successfully');
        return {data1};
    } catch (error) {
        console.error('Error reading files :' , error);
    }
}

//3. Example : Parallel Execution
async function fetchAllData() {
    try {
        const [users, products, orders] = await Promise.all([
            User.find(),
            Product.find(),
            Order.find()
        ]);
        return {users, products, orders};
        } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
}

//? Why Use Asynchronous Code?
//Asyncronous code ellets Node.js handle many request at once, without waiting for slow operations like file or database access.
//This makes Node.js great for servers and real-time appps.