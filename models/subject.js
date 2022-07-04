import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subject = new Schema({
  subject: String,
});

mongoose.models = {};

const Subject = mongoose.model("subject", subject);

export default Subject;
