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
        const groupDetails = await Group.findById(groupId).populate("students");

        const teacher = await Teacher.findOneAndUpdate(
          { email },
          { $push: { sendTests: { test: testId, groupId, date } } }
        );
        for (let student of groupDetails.students) {
          await Student.findOneAndUpdate(
            { email: student.email },
            {
              $push: {
                tests: { test: testId, currentQuestion: 1, done: false },
              },
            }
          );
          sendEmail(
            `Hi ${student.label}, `,
            `The teacher ${teacherName} sent you a test, to start clicking on the attached link And he added the following message:${message}.
             ${process.env.NEXT_PABLIC_SERVER_URL}/test/${testId}`,
            student.email
          );
        }

        await Group.findOneAndUpdate({ groupId }, { haveTest: true });

        return res.status(200).send(teacher);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  }
};

export default connectDB(handler);
