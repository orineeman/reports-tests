import connectDB from "../../middleware/mongodb";
import Test from "../../models/test";

function filterOfIsCorrect(questions) {
  const filteredQuestions = [];
  for (let question of questions) {
    const filteredQuestion = { content: "", answers: [] };
    filteredQuestion.content = question.content;
    const filteredAnswers = [];
    for (let answer of question.answers) {
      const filteredAnswer = {};
      filteredAnswer.content = answer.content;
      filteredAnswers.push(filteredAnswer);
    }
    filteredQuestion.answers = filteredAnswers;
    filteredQuestions.push(filteredQuestion);
  }

  return filteredQuestions;
}

const handler = async (req, res) => {
  if (req.method === "GET" && req.headers.pleasegettestid) {
    const testId = req.headers.pleasegettestid;
    const { questions } = await Test.findById(testId).populate([
      "questions",
      "questions.answers",
    ]);
    const filterdData = filterOfIsCorrect(questions);
    res.send(filterdData);
  } else if (req.method === "GET") {
    const tests = await Test.find().populate(["questions", "questions.age"]);
    res.send(tests);
  } else if (req.method === "POST") {
    // const test = req.body; // to postman
    const test = JSON.parse(req.body);
    // console.log("test", test);
    if (typeof test === "string") {
      console.log("test is string");
    } else {
      console.log("test is json");
    }
    if (test) {
      try {
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
