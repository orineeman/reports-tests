import mongoose from "mongoose";
const Schema = mongoose.Schema;

const age = new Schema({
  age: String,
});

mongoose.models = {};

const Age = mongoose.model("age", age);

export default Age;
