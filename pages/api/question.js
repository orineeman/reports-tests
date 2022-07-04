import connectDB from "../../middleware/mongodb";
import Question from "../../models/question";

const handler = async (req, res) => {
  // console.log(req.method);
  if (req.method === "GET") {
    const questions = await Question.find().populate([
      "age",
      "subject",
      "difficulty",
    ]);
    res.send(questions);
  } else if (req.method === "POST") {
    const question = JSON.parse(req.body);
    // const question = req.body; //postman
    console.log("question", question);
    if (typeof question === "string") {
      console.log("question is string");
    } else {
      console.log("question is json");
    }
    const {
      //   typeQuestion,
      age,
      subject,
      difficulty,
      content,
      answers,
    } = question;
    console.log(age, subject, content);
    if (
      //   typeQuestion &&
      age &&
      subject &&
      difficulty &&
      content &&
      answers
    ) {
      try {
        console.log("I'm in try");
        const newQuestion = new Question({
          //   typeQuestion,
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
