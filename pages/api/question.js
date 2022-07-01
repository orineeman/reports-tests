import connectDB from "../../middleware/mongodb";
import Question from "../../models/question";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {
      //   typeQuestion,
      age,
      subject,
      difficulty,
      question,
      answer1,
      answer2,
      answer3,
      answer4,
    } = req.body;
    if (
      //   typeQuestion &&
      age &&
      subject &&
      difficulty &&
      question &&
      answer1 &&
      answer2 &&
      answer3 &&
      answer4
    ) {
      try {
        const newQuestion = new Question({
          //   typeQuestion,
          age,
          subject,
          difficulty,
          question,
          answer1,
          answer2,
          answer3,
          answer4,
        });
        console.log(answer4);
        const questionCreated = await newQuestion.save();
        return res.status(200).send(questionCreated);
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
