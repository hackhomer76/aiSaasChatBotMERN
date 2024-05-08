import { connect, disconnect } from 'mongoose';


//連接到mongoose
async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL)
  } catch (error) {
    console.log(error);
    throw new Error("Cannot connect to MongoDB")
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch(error) {
    console.log(error);
    throw new Error("Could not disconnect Form Mongodb")
  }
}

export { connectToDatabase, disconnectFromDatabase}

