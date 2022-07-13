import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDBOnly } from "../../../middleware/mongodb";
import Teacher from "../../../models/teacher";
// import { useSession } from "next-auth/react";

export default NextAuth({
  // const { data: session } = useSession();
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user /*account, profile*/) {
      await connectDBOnly();
      // const per = await Permissions.findOne(session?.user?.email);
      // console.log("per", per);
      // if (per) {
      // הוא לא מכיר את הסשין כאן
      await Teacher.findOneAndUpdate(
        {
          email: user.user.email,
        },
        {
          name: user.user.name,
          image: user.user.image,
        },
        { upsert: true }
      );
      return true;
      // } else {
      // return false;
      // }
    },
  },
});
