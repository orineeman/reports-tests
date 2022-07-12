import connectDB from "../../middleware/mongodb";
import Group from "../../models/group";
import Student from "../../models/student";
import Teacher from "../../models/teacher";
import sendEmail from "../../utils/mail";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const testAndGroup = JSON.parse(req.body);
    // const testAndGroup = req.body; //postman
    const { message, testId, groupId, email, teacherName, date } = testAndGroup;
    if (testId && groupId && email && teacherName && date) {
      try {
        const groupDetails = await Group.findOne({ groupId }).populate(
          "students"
        );
        console.log("groupDetails:", groupDetails);

        const teacher = await Teacher.findOneAndUpdate(
          { email },
          { $push: { sendTests: { test: testId, groupId, date } } }
        );
        console.log("teacher", teacher);
        for (let student of groupDetails.students) {
          await Student.findOneAndUpdate(
            { email: student.email },
            { $push: { tests: { test: testId, currentQuestion: 0 } } }
          );
          console.log(student.fullName, student.email);
          await sendEmail(
            `Hi ${student.fullName}, `,
            `The teacher ${teacherName} sent you a test, to start clicking on the attached link And he added the following message:${message}.
             http://localhost:3000/test/${testId}`,
            student.email
          );
        }

        await Group.findOneAndUpdate({ groupId }, { haveTest: true });

        return res.status(200).send(teacher);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      // console.log("I'm here");
      res.status(422).send("data_incomplete");
    }
  }
  // else if (req.method === "PATCH") {
  //   const teacher = JSON.parse(req.body);
  //   // const teacher = req.body; //postman
  //   if (teacher.testId) {
  //     const { teacherName, email, testId } = teacher;
  //     // const test = { test: testId };
  // const updateTestsTeacher = await Teacher.findOneAndUpdate(
  //   { email },
  //   { $push: { tests: testId } }
  // );
  //     res.send(updateTestsTeacher);
  //     sendEmail(`hi ${teacherName}`, "your test saved", email);
  //   }

  //   if (teacher.groupId) {
  //     console.log("teacher", teacher);
  //     const { teacherName, email, groupId } = teacher;
  //     // const group = { group: groupId };
  //     const updateGroupsTeacher = await Teacher.findOneAndUpdate(
  //       { email },
  //       { $push: { groups: groupId } }
  //     );
  //     res.send(updateGroupsTeacher);
  //     sendEmail(`hi ${teacherName}`, "your group saved", email);
  //   }
  // } else {
  //   res.status(422).send("req_method_not_supported");
  // }
};

export default connectDB(handler);
