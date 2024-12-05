import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //Invoked on successfull signin
    async signIn({ profile }) {
      //1.connect to database.
      await connectDB();
      //2. Check for user.
      const userExists = await User.findOne({ email: profile.email });

      //3. if not create user
      if (!userExists) {
        await User.create({
          email: profile.email,
          userName: profile.name,
          image: profile.picture,
        });
      }
      //4. allow sign in
      return true;
    },
    //session callback func that modifies session object
    async session({ session }) {
      // 1.Get user from database .
      const user = await User.findOne({ email: session.user.email });
      // 2.assigne user id from the session
      session.user.id = user._id.toString();
      //3. Return sesssion
      return session;
    },
  },
};
