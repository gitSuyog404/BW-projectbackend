import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // env file supply garesi ek choti server restart garnu parxa
    // env file bata value pass garna chai 3 way xa hami chai siddhai package.json ko
    //"server": "nodemon --env-file=.env backend/index.js" esari script mai dinxam

    let conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB at ${conn.connection.host}`);
  } catch (err) {
    console.log("Failed to connect to db:", err.message);
    process.exit(1);
  }
};

export default connectDb;
