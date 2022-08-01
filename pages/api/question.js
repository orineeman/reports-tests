import connectDB from "../../middleware/mongodb";
import Answer from "../../models/answer";
import Question from "../../models/question";

const handler = async (req, res) => {
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
    for (let questionId of questionsIdToUpdate) {
      const update = await Question.findByIdAndUpdate(questionId, {
        confirmed: true,
      });
      console.log(update);
    }
    res.send("success");
  } else if (req.method === "POST") {
    const question = JSON.parse(req.body);

    const { age, subject, difficulty, content, answers, email } = question;
    if (age && subject && difficulty && content && answers) {
      let confirmed = false;
      if (email === process.env.NEXT_PABLIC_EMAIL) {
        confirmed = true;
      }
      try {
        const answersToDB = [];
        for (let answer of answers) {
          const newAnswer = new Answer({
            content: answer.content,
            isCorrect: answer.isCorrect,
          });
          const createdAnswer = await newAnswer.save();
          answersToDB.push(createdAnswer._id);
          console.log("answersToDB", answersToDB);
        }

        const newQuestion = new Question({
          age,
          subject,
          difficulty,
          content,
          answers: answersToDB,
          confirmed,
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
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
