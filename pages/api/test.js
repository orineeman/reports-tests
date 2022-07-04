import connectDB from "../../middleware/mongodb";
import Test from "../../models/test";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const tests = await Test.find().populate(["questions", "questions.age"]);
    res.send(tests);
  } else if (req.method === "POST") {
    // const test = req.body; // to postman
    const test = JSON.parse(req.body);
    // console.log("test", test);
    // const { questions } = req.body.questions;
    if (typeof test === "string") {
      console.log("test is string");
    } else {
      console.log("test is json");
    }
    // const test = req.body.questions;

    if (test) {
      try {
        console.log(2, test);
        const newTest = new Test(test);
        const testCreated = await newTest.save();
        return res.status(200).send(testCreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
