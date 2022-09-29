const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

/**
 * It creates a MongoDB instance in memory, and returns the URI of the database.
 * @returns The uri of the mongodb server.
 */
const initializeServer = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  return uri;
};

/**
 * Connect to the database, but first initialize the server.
 */
const connect = async () => {
  const uri = await initializeServer();
  await mongoose.connect(uri);
};

/**
 * Clear the database by deleting all documents from all collections.
 */
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

/**
 * It drops the database, closes the connection, and stops the mongod process.
 */
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

module.exports = {
  connect,
  clearDatabase,
  closeDatabase
};
