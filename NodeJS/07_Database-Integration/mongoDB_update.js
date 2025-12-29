const { MongoClient } = require('mongodb');
require('dotenv').config();
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

//Update One Docuement
async function run() {
    try {
        await client.connect();
        const db = client.db('gfg');
        const collection = db.collection('customers');
        const query = { address: 'Valley 345' };
        const newvalues = { $set: { name: 'Mickey', address: 'canyon 12345' } };
        const results = await collection.updateOne(query, newvalues);
        console.log('Document Updated', results);
    } catch (error) {
        console.error('Connection Failed', error.message);
    }
}

run();

//Update Many Document
async function run2() {
    try {
        const db = client.db('gfg');
        const collection = db.collection('customers');
        const query = { address: /^S/ };
        const newValues = {
            $set: { name: 'Minnie', address: 'Grand Canyon 404' },
        };
        const results = await collection.updateMany(query, newValues);
        console.log('Documents Updated', results);
        await client.close();
    } catch (error) {
        console.error('Connection Failed', error.message);
    }
}

run2();
