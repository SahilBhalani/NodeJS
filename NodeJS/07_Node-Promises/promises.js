//* Benefits of Using Promises

// //With Callbacks
// getUser(id, (err,user) => {
//     if(err) return handleError(err);
//     getOrders(user.id, (err, orders) => {
//         if(err) return handleError(err);
//         //Process orders...
//     });
// });

// //With Promises
// getUser(id) 
// .then(user => getOrders(user.id))
// .then(orders => processOrders(orders))
// .catch(handleError);

//* Creatig and Using Promises
//Promises can be created using the Promise constructor, which accepts an executor function with two parameters: resolve and reject.

// Basic Promise Creation
const myPromise = new Promise((resolve, reject) => {
    //Simulate an async operation (e.g API call, file read)
    setTimeout(() => {
        const success = Math.random() > 0.5;

        if(success) {
            resolve('Operation completed successfully');
        } else {
            reject(new Error('Operation failed'));
        }
    }, 1000); //simulate delay
})

//using The promise
myPromise
.then(result => console.log("Success: ", result))
.catch(error => console.error('Error : ', error.message));

//* Reading a File with Promises
const fs = require('fs').promises;
const promise1 = Promise.resolve('First Result');
const promise2 = new Promise((resolve) => setTimeout(() => resolve('Second result'), 1000));
const promise3 = fs.readFile('myfile.txt', 'utf8'); //Read local file instead of fetch

Promise.all([promise1, promise2, promise3])
.then(results => {
    console.log('Results: ', results);
    //result[0] is from promise1
    //result[1] is from promise2
    //result[2] is from promise3
})
.catch(error => {
    console.error('Error in one of the promises: ', error);
})


//* Promise Chaining
//Promises can be chained to execute asynchronous operatios in sequence, with each .then() receiving the result of the previous operations

//Ex. Promise Chaining
function getUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id: userId, name: 'Sahil'})
        }, 1000);
    });
}

function getUserPosts(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['Post 1' , 'Post 2', 'Post 3']);
        }, 1000)
    });
}

//Chain The promises
getUser(777)
.then(user => {
    console.log('User: ', user);
    return getUserPosts(user);
})
.then(posts => {
    console.log('Posts: ', posts);
})
.catch(error => {
    console.error("Error: " , error);
});

//* Ex. Timeout Pattern With Promise.race()
const prom1 = new Promise(resolve => setTimeout(() => resolve('First Result'), 1000));
const prom2 = new Promise(resolve => setTimeout(() => resolve('Second Result'), 500));

Promise.race([prom1, prom2])
.then(result => {
    console.log('Fastest result:', result);
    //will log 'Second result' because prom2 is faster
});

//* Error Handling in Promises
//Proper error handling is important
//Promises provide several ways to handle errors:

//Ex. Error Handling in Promise
function fetchData() {
    return new Promise((resolve, reject) => {
        reject(new Error('Network error'));
    });
}

fetchData()
.then(
    data => console.log('Data: ', data),
    error => console.log('Error handled in then: ', error.message)
);

//alternatice method using catch
fetchData()
.then(data => console.log('Data: ', data))
.catch(error => console.log('Error Handled in catch: ', error.message));