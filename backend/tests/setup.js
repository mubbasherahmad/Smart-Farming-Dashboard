const { MongoMemoryServer } = require('mongodb-memory-server'); 
// Add this line
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});