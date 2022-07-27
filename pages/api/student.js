import connectDB from "../../middleware/mongodb";
import Answer from "../../models/answer";
import Student from "../../models/student";
import Test from "../../models/test";

const handler = async (req, res) => {
  if (req.method === "GET") {
    if (req.headers.pleaseget === "tests") {
      const student = await Student.findOne({
        email: req.headers.email,
      }).populate(["tests.test"]);

      const testsNoDone = [];
      for (let test of student.tests) {
        if (!test.done) {
          testsNoDone.push(test);
        }
      }
      res.send(testsNoDone);
    }
  } else if (req.method === "PATCH" && req.headers.answer === "answer") {
    const data = JSON.parse(req.body);
    // const teacher = req.body; //postman
    const {
      markedAnswersId,
      time,
      currentQuestion,
      email,
      testId,
      questionId,
      restAnswers,
    } = data.dataToServer;
    if (
      // There is a situation where the student did not mark any answer,
      // therefore 'markedAnswersId' is not in the condition
      currentQuestion &&
      email &&
      testId &&
      questionId &&
      restAnswers
    ) {
      let done = false;
      const test = await Test.findById(testId);
      if (currentQuestion >= test.questions.length) {
        done = true;
        // gradeCalculation(email, testId, numOfQuestions);
      }
      const answers = [];
      let answerCorrectly = null;
      if (markedAnswersId[0]) {
        for (let markedAnswerId of markedAnswersId) {
          const markedAnswer = await Answer.findByIdAndUpdate(markedAnswerId, {
            $inc: {
              "statistics.numberOfResponses": 1,
            },
          });
          if (markedAnswer.isCorrect) {
            answerCorrectly = true;
            await Answer.findByIdAndUpdate(markedAnswerId, {
              $inc: {
                "statistics.amountOfRight": 1,
              },
            });
          } else {
            answerCorrectly = false;
            await Answer.findByIdAndUpdate(markedAnswerId, {
              $inc: {
                "statistics.amountOfMistakes": 1,
              },
            });
          }

          const markedAnswerToDB = {
            answer: markedAnswer.answerId,
            markAsCorrectAnswer: true,
          };
          answers.push(markedAnswerToDB);
        }
      }

      for (let answer of restAnswers) {
        const restAnswerToDB = {
          answer: answer.answerId,
          markAsCorrectAnswer: false,
        };
        answers.push(restAnswerToDB);
      }

      try {
        await Student.findOneAndUpdate(
          { email, "tests.test": testId },
          {
            $set: {
              "tests.$.done": done,
              "tests.$.currentQuestion": currentQuestion + 1,
            },
            $push: {
              "tests.$.questions": {
                questionId,
                responseTime: time,
                answerCorrectly,
                answers,
              },
            },
          }
        );
      } catch (e) {
        console.log("ERROR", e);
      }
      // Update the rest of the answers in a database
      for (let answer of restAnswers) {
        const ans = await Answer.findById(answer.answerId);
        if (ans.isCorrect) {
          await Answer.findByIdAndUpdate(ans._id, {
            $inc: {
              "statistics.amountOfMistakes": 1,
              "statistics.numberOfResponses": 1,
            },
          });
        } else {
          await Answer.findByIdAndUpdate(ans._id, {
            $inc: {
              "statistics.amountOfRight": 1,
              "statistics.numberOfResponses": 1,
            },
          });
        }
      }
      if (done) {
        const numOfQuestions = test.questions.length;
        gradeCalculation(email, testId, numOfQuestions);
      }
    }

    res.send("updateTestOfStudent");
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);

async function gradeCalculation(email, testId, numOfQuestions) {
  try {
    let numOfCorrectAnswers = 0;
    const student = await Student.findOne({ email });
    for (let test of student.tests) {
      if (test.test == testId) {
        for (let question of test.questions) {
          if (question.answerCorrectly) numOfCorrectAnswers++;
        }
      }
    }
    const percentage = numOfQuestions / numOfCorrectAnswers;
    const grade = 100 / percentage;
    await Student.findOneAndUpdate(
      { email, "tests.test": testId },
      {
        $set: {
          "tests.$.grade": grade,
        },
      }
    );
  } catch (e) {
    console.log("ERROR", e);
  }
}
