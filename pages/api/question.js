import connectDB from "../../middleware/mongodb";
import Question from "../../models/question";

const handler = async (req, res) => {
  console.log(req.method);
  if (req.method === "GET") {
    const questions = await Question.find();
    res.send(questions);
  } else if (req.method === "POST") {
    const question = JSON.parse(req.body);
    console.log("req.body", req.body);
    // if (typeof req.body === "string") {
    //   console.log("req.body is string");
    // } else {
    //   console.log("req.body is json");
    // }
    const {
      //   typeQuestion,
      age,
      subject,
      // difficulty,
      content,
      // answers,
    } = question;
    console.log(age, subject, content);
    if (
      //   typeQuestion &&
      age &&
      subject &&
      // difficulty &&
      content
      //  && answers
    ) {
      try {
        console.log("I'm in try");
        const newQuestion = new Question({
          //   typeQuestion,
          age,
          // subject,
          // difficulty: "1",
          content,
          // answers,
          // confirmed: false,
          // statistics: {
          // numberOfResponses: 0,
          // amountOfRight: 0,
          // amountOfMistakes: 0,
          // averageResponseTimeSec: 0,
          // },
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
