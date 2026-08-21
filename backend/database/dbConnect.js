// mongodb+srv://<db_username>:euELnUMI1CeAncvk@cluster0.ezwy2ma.mongodb.net/
import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.log("MongoDB Connection failed:", error);
  }
};

export default connectDB;
