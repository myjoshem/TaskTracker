const dotenv = require('dotenv');
dotenv.config(); 
const { MongoClient } = require('mongodb');
let db;

const connectDb = async () => {
  const uri = process.env.MONGODB_URI; // Replace with your connection string
  const client = new MongoClient(uri);
  if (db) {
    console.log('Db is already initialized!');
    return db;
  }
  try {
    await client.connect();
    db = client.db(); // Replace 'task-tracker' with your actual database name
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDb first.');
  }
  return db;
};

module.exports = { connectDb, getDb };
