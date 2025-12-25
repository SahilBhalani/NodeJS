// * Node.js ES6+ Features

// * Arrow Functions
//Traditional Function
function add(a, b) {
    return a + b;
}

//Arrow function same as above
const addArrow = (a, b) => a + b;

//Single Parameter (no parentheses needed)
const double = (bum) => num * 2;

// No Parameters (paranthesis needed)
const sayHello = () => 'Hello!';

//Using with array methods
const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);
console.log(doubled);

//* Destructuring
//Object Destructuring
const user = { name: 'Alice', age: 30, location: 'New York' };
const { name, age } = user;
console.log(name, age);

//Array Destructuring
const colors = ['red', 'green', 'blue'];
const [first, second, third] = colors;
console.log(first, second, third);

//Skipping elements
const [primary, , tertiary] = colors;
console.log(primary, tertiary);

// * Spread and Rest Operators
//Array Spread - Combining Arrays
const nums = [1, 2, 3];
const moreNumbers = [4, 5, 6];
const combined = [...nums, ...moreNumbers];
console.log(combined);

//Array Spread - converting string array of characters
const chars = [...'hello'];
console.log(chars);

//Rest parameter in functions
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5));

// * Promises
// Creating a promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        //Simulating an API Call
        setTimeout(() => {
            const data = { id: 1, name: 'Product' };
            const success = true;

            if (success) {
                resolve(data);
            } else {
                reject(new Error('Failed to fetch Data'));
            }
        }, 1000);
    });
};

//Using a promise
console.log('Fetching Data...');

fetchData()
    .then((data) => {
        console.log('Data received:', data);
        return data.id;
    })
    .then((id) => {
        console.log('Processing ID:', id);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    })
    .finally(() => {
        console.log(`Operation completed (success or failure)`);
    });
console.log('Continuing execution while fetch happen in background');

// * Async / Await
//Function that eturn a promise
const fetchUser = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: `User ${id}` });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1000);
    });
};

//using async/await
async function getUserData(id) {
    try {
        console.log('Fetching user...');
        const user = await fetchUser(id);
        console.log('User Data:', user);

        //You can use the result directly
        return `${user.name}'s profile `;
    } catch (error) {
        //Handle errors with try//catch
        console.error('Error fetching user:', error.message);
        return 'Guest profile';
    }
}

//Async function always return promises
console.log('Starting...');
getUserData(1)
    .then((result) => console.log('Result:', result))
    .catch((error) => console.error('Unexpected error:', error));
console.log('This runs before getUserData completes');

//* Optional Chaining (?.)
//ex.
function getUserCity(user) {
    return user?.address?.city;
}

const user1 = {
    name: 'Alice',
    address: { city: 'New York', country: 'USA' },
};

const user2 = {
    name: 'Bob',
};

const user3 = null;

console.log(getUserCity(user1));
console.log(getUserCity(user2));
console.log(getUserCity(user3));

//* Modern Asynchronous Patterns

//ex. Sequential Execution
//Helper function to simulate an API CALL
function fetchData1(id) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data for ID ${id}`), 1000);
    });
}

//Sequential execution (-3 seconds total)
async function fetchSequential() {
    console.time('sequential');
    const data1 = await fetchData1(1);
    const data2 = await fetchData1(2);
    const data3 = await fetchData1(3);
    console.timeEnd('sequential');
    return [data1,data2,data3]
}

//Run the sequential example
fetchSequential().then(results => {
    console.log('Sequential results:', results);
})

//Ex. Parallel Execution
async function fetchParallel() {
    console.time('parallel');
    const results = await Promise.all([
        fetchData1(1),
        fetchData1(2),
        fetchData1(3)
    ]);
    console.timeEnd('parallel');
    return results;
}

//Run the parallel example
fetchParallel().then(results => {
    console.log('Parallel results:', results);
});

