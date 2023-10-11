import mongoose from "mongoose";

async function connectToDatabase() {
  let isConnect = false;

  mongoose.set('strictQuery', true);

  if (!isConnect) {
    try {
      await mongoose.connect(config.MONGODB_URI, {
        dbName: config.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      isConnect = true;

      console.log('MongoDB connected');
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('MongoDB is already connected');
  }
}

export default connectToDatabase();
