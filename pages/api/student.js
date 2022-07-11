import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "GET") {
    console.log("get");
  } else if (req.method === "PATCH" && req.headers.answer === "answer") {
    console.log("ooooooooooooooooooooooo");
    const data = JSON.parse(req.body);
    console.log("data:", data);
    // const teacher = req.body; //postman
    const { markedAnswer, time, currentQuestion, email, testId, questionId } =
      data.dataToServer;
    if (markedAnswer && currentQuestion && email && testId && questionId) {
      const updateTestOfStudent = await Student.findOneAndUpdate(
        { email, tests: testId },
        { fullName: "popo" }
      );
      res.send(updateTestOfStudent);
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
