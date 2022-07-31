import mongoose from "mongoose";
import Student from "./student";
const Schema = mongoose.Schema;

const group = new Schema({
  students: [{ type: Schema.Types.ObjectId, ref: Student }],
  haveTest: Boolean,
  label: String,
});

mongoose.models = {};

const Group = mongoose.model("group", group);

export default Group;
