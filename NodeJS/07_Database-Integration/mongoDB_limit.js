const { MongoClient } = require('mongodb');
require('dotenv').config();
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        const db = client.db('gfg');
        const collection = db.collection('customers');
        const result = await collection.find().limit(5).toArray();
        console.log(result);
        await client.close();
    } catch (error) {
        console.error('Connection Failed. ', error.message);
    }
}

run();
