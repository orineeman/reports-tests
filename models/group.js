import mongoose from "mongoose";
import Student from "./student";
import Test from "./test";
const Schema = mongoose.Schema;

const group = new Schema({
  students: [{ type: Schema.Types.ObjectId, ref: Student }],
  tests: [{ type: Schema.Types.ObjectId, ref: Test }],
});

mongoose.models = {};

const Group = mongoose.model("answer", group);

export default Group;
