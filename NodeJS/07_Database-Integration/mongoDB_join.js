const { MongoClient } = require('mongodb');
require('dotenv').config();
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        const db = client.db('sample_mflix');
        const collection = db.collection('comments');
        const result = await collection
            .aggregate([
                {
                    $lookup: {
                        from: 'movies',
                        localField: 'movie_id',
                        foreignField: '_id',
                        as: 'movie_details',
                    },
                },
                {
                    $limit: 5,
                },
            ])
            .toArray();
        console.log(result);
        await client.close();
    } catch (error) {
        console.error('Connection Failed', error.message);
    }
}

run();
