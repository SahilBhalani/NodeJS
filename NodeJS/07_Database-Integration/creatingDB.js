const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_URI;

const client = new MongoClient(url);

async function run() {
    try {
        // connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB Atlas!');

        // Choose the database
        const db = client.db('gfg');

        //Choose the collection
        const collection = db.collection('customers');

        // Find a document
        const result = await collection.findOne({ name: 'John Doe' });
        console.log(`Result: ${result.email}`);

        //Close the connection
        await client.close();
    } catch (err) {
        console.error('Connection failed:', err.message);
    }
}

run();
