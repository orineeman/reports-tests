import connectDB from "../../middleware/mongodb";
import Teacher from "../../models/teacher";
import sendEmail from "../../utils/mail";

const handler = async (req, res) => {
  if (req.method === "GET") {
    if (req.headers.pleaseget === "groups and tests") {
      console.log("i'm here");
      // const teacher = await Teacher.findOne(req.body.email).populate([]);
      const teacherDetails = await Teacher.findOne({
        email: req.headers.email,
      }).populate(["groups", "tests"]);
      res.send(teacherDetails);
    }
  } else if (req.body.pleaseGet === "get all teachers to admin") {
    const teacher = await Teacher.findById().populate([]);
    res.send(teacher);
  }
  // else if (req.method === "POST") {
  //     // const teacher = JSON.parse(req.body);
  //     const teacher = req.body; //postman
  //     console.log("teacher", teacher);
  //     if (typeof teacher === "string") {
  //       console.log("teacher is string");
  //     } else {
  //       console.log("teacher is json");
  //     }
  //     const { name, email } = teacher;
  //     if (name && email) {
  //       try {
  //         console.log("I'm in try");
  //         const newTeacher = new Teacher({
  //           name,
  //           email,
  //           groups: [],
  //           tests: [],
  //         });
  //         const teacherCreated = await newTeacher.save();
  //         return res.status(200).send(teacherCreated);
  //       } catch (error) {
  //         return res.status(500).send(error.message);
  //       }
  //     } else {
  //       console.log("I'm here");
  //       res.status(422).send("data_incomplete");
  //     }
  //   }
  else if (req.method === "PATCH") {
    const teacher = JSON.parse(req.body);
    // const teacher = req.body; //postman
    if (teacher.testId) {
      console.log("teacher", teacher);
      const { email, testId } = teacher;
      // const test = { test: testId };
      const updateTestsTeacher = await Teacher.findOneAndUpdate(
        { email },
        { $push: { tests: testId } }
      );
      res.send(updateTestsTeacher);
    }

    if (teacher.groupId) {
      const { teacherName, email, groupId } = teacher;
      // const group = { group: groupId };
      const updateGroupsTeacher = await Teacher.findOneAndUpdate(
        { email },
        { $push: { groups: groupId } }
      );
      res.send(updateGroupsTeacher);
      sendEmail(`hi ${teacherName}`, "your group saved", email);
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
