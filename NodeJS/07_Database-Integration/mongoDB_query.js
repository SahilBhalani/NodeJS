const { MongoClient } = require('mongodb');
require('dotenv').config();
const url = process.env.MONGO_URI;

const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas!');
        const db = client.db('gfg');
        const collection = db.collection('customers');
        const query = { address: /^S/ };
        const result = await collection.find(query).toArray();
        console.log(result);
        await client.close();
    } catch (err) {
        console.error('Connection failed:', err.message);
    }
}

run();
