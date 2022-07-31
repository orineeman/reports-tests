import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDBOnly } from "../../../middleware/mongodb";
import Teacher from "../../../models/teacher";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user /*account, profile*/) {
      await connectDBOnly();
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
    },
  },
});
