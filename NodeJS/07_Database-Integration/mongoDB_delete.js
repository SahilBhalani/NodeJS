const { MongoClient } = require('mongodb');
require('dotenv').config();
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        const db = client.db('gfg');
        const collection = db.collection('customers');
        const query = { address: 'Mountain 21' };
        const result = await collection.deleteOne(query);
        console.log('Document deleted', result);
        await client.close();
    } catch (error) {
        console.error('Connection Failed', error.message);
    }
}

run();
