import mongoose from "mongoose";
const Schema = mongoose.Schema;

const message = new Schema({
  message: String,
  isRead: Boolean,
  email: String,
  date: String,
  answer: String,
});

mongoose.models = {};

const Message = mongoose.model("message", message);

export default Message;
