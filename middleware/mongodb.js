import mongoose from "mongoose";
const { DB_USER, DB_HOST, DB_PASS, DB_NAME } = process.env;
const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
  );
  return handler(req, res);
};

export const connectDBOnly = () => {
  if (mongoose.connections[0].readyState) {
    return mongoose.connection.db;
  }
  return mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
  );
};

export default connectDB;
