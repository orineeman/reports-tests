import mongoose from "mongoose";
const Schema = mongoose.Schema;

const permission = new Schema({
  fullName: String,
  email: String,
});

mongoose.models = {};

const Permission = mongoose.model("permission", permission);

export default Permission;
