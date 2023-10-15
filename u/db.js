const { MongoClient, ObjectId } = require('mongodb');

process.env.MONGODB_URI = 'mongodb://azikaban:OMHKnj0TO7Rj8ZMf6WonqAjik6RJPaF520cy255CJhrEzmRe1PfVTJfDHHiyaOBolZOavDigcGggACDbTcD5yA==@azikaban.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@azikaban@';

if (!process.env.MONGODB_URI) {
    // throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    process.env.MONGODB_URI = 'mongodb://localhost:27017';
}

// Connect to MongoDB
async function connectToDB() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('Volunteer');
    db.client = client;
    return db;
}

module.exports = { connectToDB, ObjectId };