import Question from "../../../models/question";
import connectDB from "../../../middleware/mongodb";
import Answer from "../../../models/answer";
import Permission from "../../../models/permissions";
import Age from "../../../models/age";
import Subject from "../../../models/subject";
import Difficulty from "../../../models/difficulty";
const email = process.env.EMAIL;
const handler = async (req, res) => {
  if (req.method === "GET" && req.headers.idtoupdate) {
    const idToUpdate = req.headers.idtoupdate;
    let response = {};
    if (req.headers.valuetodelete === "age") {
      const age = await Age.findById(idToUpdate);
      response = age;
    }
    if (req.headers.valuetodelete === "subject") {
      const subject = await Subject.findById(idToUpdate);
      response = subject;
    }
    if (req.headers.valuetodelete === "difficulty") {
      const difficulty = await Difficulty.findById(idToUpdate);
      response = difficulty;
    }
    if (req.headers.valuetodelete === "fullName") {
      const permission = await Permission.findById(idToUpdate);
      response = permission;
    }
    res.send(response);
  } else if (req.method === "GET") {
    const dataToUpdate = req.headers.pleaseget;
    const data = {};

    if (dataToUpdate === "permissions") {
      const permissions = await Permission.find({ email: { $nin: email } });
      data.permissions = permissions;
      data.value = "permissions";
    } else if (dataToUpdate === "ages") {
      const ages = await Age.find();
      data.ages = ages;
      data.value = "ages";
    } else if (dataToUpdate === "subjects") {
      const subjects = await Subject.find();
      data.subjects = subjects;
      data.value = "subjects";
    } else if (dataToUpdate === "difficulties") {
      const difficulties = await Difficulty.find();
      data.difficulties = difficulties;
      data.value = "difficulties";
    }
    res.send(data);
  } else if (req.method === "POST") {
    const valueToAdd = JSON.parse(req.body);
    const { type, value } = valueToAdd;
    if (type === "ages") {
      try {
        const newAge = new Age({
          age: value,
        });
        const ageCreated = await newAge.save();
        return res.status(200).send(ageCreated);
      } catch (error) {
        console.log("error", error);
      }
    }
    if (type === "subjects") {
      try {
        const newSubject = new Subject({
          subject: value,
        });
        const subjectCreated = await newSubject.save();
        return res.status(200).send(subjectCreated);
      } catch (error) {
        console.log("error", error);
      }
    }
    if (type === "difficulties") {
      try {
        const newDifficulty = new Difficulty({
          difficulty: value,
        });
        const difficultyCreated = await newDifficulty.save();
        return res.status(200).send(difficultyCreated);
      } catch (error) {
        console.log("error", error);
      }
    }
    // res.send(type);
  } else if (req.method === "PATCH") {
    const dataToUpdate = JSON.parse(req.body);
    console.log("dataToUpdate", dataToUpdate);
    const {
      questionId,
      answerContent,
      age,
      difficulty,
      questionContent,
      subject,
    } = dataToUpdate;
    if (age) {
      await Question.findByIdAndUpdate(questionId, { age });
    }
    if (difficulty) {
      await Question.findByIdAndUpdate(questionId, { difficulty });
    }
    if (subject) {
      await Question.findByIdAndUpdate(questionId, { subject });
    }
    if (questionContent) {
      await Question.findByIdAndUpdate(questionId, {
        content: questionContent,
      });
    }
    if (answerContent) {
      console.log("answerContent", answerContent);
      const answersId = Object.keys(answerContent);
      console.log("answersId", answersId);
      for (let answerId of answersId) {
        await Question.findByIdAndUpdate(
          { questionId, "answers._id": answerId },
          {
            $set: {
              "answers.$.content": answerContent.answerId,
            },
          }
        );
        await Answer.findByIdAndUpdate(answerId, {
          content: answerContent.answerId,
        });
      }
    }
    res.send(dataToUpdate);
  } else if (req.method === "DELETE") {
    const dataToDelete = JSON.parse(req.body);
    const [questionIdToDelete] = dataToDelete;
    console.log("questionIdToDelete", questionIdToDelete);
    await Question.findByIdAndRemove(questionIdToDelete);
    res.send("the question is deleted");
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
