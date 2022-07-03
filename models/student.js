import mongoose from "mongoose";
import Test from "./test";
const Schema = mongoose.Schema;

const student = new Schema({
  email: {
    type: String,
  },
  tests: [{ test: { type: Schema.Types.ObjectId, ref: Test }, grade: Number }],
});

mongoose.models = {};

const Student = mongoose.model("Teacher", student);

export default Student;
