import connectDB from "../../../middleware/mongodb";
import Permission from "../../../models/permissions";
import Teacher from "../../../models/teacher";

const handler = async (req, res) => {
  // if (req.method === "GET" && req.headers.pleaseget === "valueToSearch") {
  //   const t = JSON.parse(req.headers.valuetosearch);
  //   console.log("tttd", t);
  // } else
  if (req.method === "GET") {
    // console.log("req.headers", req.headers);
    const { email } = req.query;
    let teacherDetails = {};
    const validationOfPermissions = await Permission.findOne({
      email,
    });
    if (validationOfPermissions) {
      teacherDetails = await Teacher.findOne({
        email,
      })
        .populate(["groups", "tests"])
        .populate("sendTests.groupId")
        .populate({ path: "groups", populate: { path: "students" } });
    }
    // studentsOfTeacher = await Teacher.findOne({
    //     email,
    //   })
    //     .populate(["groups.students", "tests"])
    //     .populate("sendTests.groupId");
    // }

    res.send(teacherDetails);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
