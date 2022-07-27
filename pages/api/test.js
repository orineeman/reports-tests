import connectDB from "../../middleware/mongodb";
import Test from "../../models/test";
import Student from "../../models/student";

function filterOfIsCorrect(questions) {
  const filteredQuestions = [];
  for (let question of questions) {
    const filteredQuestion = { content: "", answers: [] };
    filteredQuestion.content = question.content;
    filteredQuestion.questionId = question._id;

    const filteredAnswers = [];
    for (let answer of question.answers) {
      const filteredAnswer = {};
      filteredAnswer.content = answer.content;
      filteredAnswer.answerId = answer._id;
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
    const student = await Student.findOne({ email: req.headers.email });
    let currentQuestion = 1;
    let done = false;
    for (let test of student.tests) {
      if (test.test == testId) {
        if (test.done) {
          done = true;
        }
        if (test.currentQuestion !== 1) {
          currentQuestion = test.currentQuestion;
        }
      }
    }
    const data = {
      filterdData: filterOfIsCorrect(questions),
      currentQuestion,
      done,
    };
    res.send(data);
  } else if (req.method === "GET") {
    const tests = await Test.find().populate(["questions", "questions.age"]);
    res.send(tests);
  } else if (req.method === "POST") {
    const test = JSON.parse(req.body);

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
