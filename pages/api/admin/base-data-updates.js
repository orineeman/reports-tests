import connectDB from "../../../middleware/mongodb";
import Permission from "../../../models/permissions";
import Age from "../../../models/age";
import Subject from "../../../models/subject";
import Difficulty from "../../../models/difficulty";
const email = process.env.NEXT_PABLIC_EMAIL;
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
    const { id, newValue, field } = dataToUpdate;
    let response = {};
    if (field === "age") {
      const age = await Age.findByIdAndUpdate(id, { [field]: newValue });
      response = age;
    }
    if (field === "subject") {
      const subject = await Subject.findByIdAndUpdate(id, {
        [field]: newValue,
      });
      response = subject;
    }
    if (field === "difficulty") {
      const difficulty = await Difficulty.findByIdAndUpdate(id, {
        [field]: newValue,
      });
      response = difficulty;
    }
    if (field === "fullName") {
      const permission = await Permission.findByIdAndUpdate(id, {
        [field]: newValue,
      });
      response = permission;
    }
    res.send(response);
  } else if (req.method === "DELETE") {
    const idToUpdate = req.headers.idtoupdate;
    let response = {};
    if (req.headers.valuetodelete === "age") {
      const age = await Age.findByIdAndRemove(idToUpdate);
      response = age;
    }
    if (req.headers.valuetodelete === "subject") {
      const subject = await Subject.findByIdAndRemove(idToUpdate);
      response = subject;
    }
    if (req.headers.valuetodelete === "difficulty") {
      const difficulty = await Difficulty.findByIdAndRemove(idToUpdate);
      response = difficulty;
    }
    if (req.headers.valuetodelete === "fullName") {
      const permission = await Permission.findByIdAndRemove(idToUpdate);
      response = permission;
    }
    res.send(response);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
