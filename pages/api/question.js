import connectDB from "../../middleware/mongodb";
import Question from "../../models/question";

const handler = async (req, res) => {
  // console.log(req.method);
  if (req.method === "GET" && req.headers.pleaseget === "newQuestions") {
    const newQuestions = await Question.find({ confirmed: false }).populate([
      "age",
      "subject",
      "difficulty",
      "answers",
    ]);
    res.send(newQuestions);
  } else if (req.method === "GET") {
    const questions = await Question.find({ confirmed: true }).populate([
      "age",
      "subject",
      "difficulty",
    ]);
    res.send(questions);
  } else if (
    req.method === "PATCH" &&
    req.headers.pleaseget === "newQuestions"
  ) {
    const questionsIdToUpdate = JSON.parse(req.body);
    console.log("questionsIdToUpdate", questionsIdToUpdate);
    for (let questionId of questionsIdToUpdate) {
      const update = await Question.findByIdAndUpdate(questionId, {
        confirmed: true,
      });
      console.log(update);
    }
    // const questions = await Question.findByIdAndUpdate({}, { confirmed: true });
    res.send("success");
  } else if (req.method === "POST") {
    const question = JSON.parse(req.body);
    // const question = req.body; //postman
    console.log("question", question);
    if (typeof question === "string") {
      console.log("question is string");
    } else {
      console.log("question is json");
    }
    const { age, subject, difficulty, content, answers } = question;
    if (age && subject && difficulty && content && answers) {
      try {
        console.log("I'm in try");
        const newQuestion = new Question({
          age,
          subject,
          difficulty,
          content,
          answers,
          confirmed: false,
          statistics: {
            numberOfResponses: 0,
            amountOfRight: 0,
            amountOfMistakes: 0,
            averageResponseTimeSec: 0,
          },
        });
        const questionCreated = await newQuestion.save();
        return res.status(200).send(questionCreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      console.log("I'm here");
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
