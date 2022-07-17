import connectDB from "../../../middleware/mongodb";
import Permission from "../../../models/permissions";
import Group from "../../../models/group";
import Teacher from "../../../models/teacher";

const handler = async (req, res) => {
  if (req.method === "GET") {
    // console.log("req.query", req.query);
    const { searchByType } = req.query;
    const type = searchByType[0];
    const idForSearch = searchByType[1];
    // let response;
    if (type === "group") {
      const group = await Group.findById(idForSearch).populate("students");
      const groupTestsId = [];
      for (let studentTests of group.students[0].tests) {
        groupTestsId.push(studentTests.test);
      }
      console.log(groupTestsId);
      res.send(groupTestsId);
    }

    // let teacherDetails = {};
    // const validationOfPermissions = await Permission.findOne({
    //   email,
    // });
    // if (validationOfPermissions) {
    //   teacherDetails = await Teacher.findOne({
    //     email,
    //   })
    //     .populate(["groups", "tests"])
    //     .populate("sendTests.groupId")
    //     .populate({ path: "groups", populate: { path: "students" } });
    // }
    // // studentsOfTeacher = await Teacher.findOne({
    // //     email,
    // //   })
    // //     .populate(["groups.students", "tests"])
    // //     .populate("sendTests.groupId");
    // // }

    // res.send(teacherDetails);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
