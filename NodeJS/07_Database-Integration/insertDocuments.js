const { MongoClient } = require('mongodb');
require('dotenv').config();
let url = process.env.MONGO_URI;

const client = new MongoClient(url);

async function insertDoc() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const dbo = client.db('gfg');
        let myobj = [
            { name: 'John', address: 'Highway 71' },
            { name: 'Peter', address: 'Lowstreet 4' },
            { name: 'Amy', address: 'Apple st 652' },
            { name: 'Hannah', address: 'Mountain 21' },
            { name: 'Michael', address: 'Valley 345' },
            { name: 'Sandy', address: 'Ocean blvd 2' },
            { name: 'Betty', address: 'Green Grass 1' },
            { name: 'Richard', address: 'Sky st 331' },
            { name: 'Susan', address: 'One way 98' },
            { name: 'Vicky', address: 'Yellow Garden 2' },
            { name: 'Ben', address: 'Park Lane 38' },
            { name: 'William', address: 'Central st 954' },
            { name: 'Chuck', address: 'Main Road 989' },
            { name: 'Viola', address: 'Sideway 1633' },
        ];

        const res = await dbo.collection('customers').insertMany(myobj);
        console.log('Number of document inserted, id:', res.insertedCount);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.close();
    }
}

insertDoc();
