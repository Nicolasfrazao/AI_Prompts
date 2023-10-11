import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/user';

import { connectToDatabase } from '@/utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUSer._id.toString();

      return session;
    },

    async singIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowercase(),
            image: profile.picture,
          });
        }

        return true

      } catch (error) {
        console.log('Error during checking: ', error.message);
        return false
      }
    },
  }
})

export { handler as get, handler as post }
