import mongoose from "mongoose";
const { DB_USER, DB_HOST, DB_PASS, DB_NAME } = process.env;
const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
  );
  return handler(req, res);
};

export const connectDBOnly = () => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return mongoose.connection.db;
  }
  // Use new db connection
  return mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
  );
};

export default connectDB;
