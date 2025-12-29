const { MongoClient } = require('mongodb');
require('dotenv').config();
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        const db = client.db('gfg');
        const collection = db.collection('orders');
        const result = await collection.drop();
        console.log('Collection Dropped', result);
        await client.close();
    } catch (error) {
        console.error('Connection Failed', error.message);
    }
}

run();
