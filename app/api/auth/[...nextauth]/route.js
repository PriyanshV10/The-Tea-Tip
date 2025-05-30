import NextAuth from "next-auth";
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from "mongoose";
import User from "@/app/models/User";
import Payment from "@/app/models/Payment";
import connectDB from "@/app/db/connectDB";
import username from "@/app/user/[username]/page";

const authOptions = NextAuth({
    providers: [
        // AppleProvider({
        //     clientId: process.env.APPLE_ID,
        //     clientSecret: process.env.APPLE_SECRET
        // }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET
        // }),
        // EmailProvider({
        //     server: process.env.MAIL_SERVER,
        //     from: 'NextAuth.js <no-reply@example.com>'
        // }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == "github") {
                // Connect to database
                await connectDB()
                // Check if the user already exists in the database
                const currentUser = await User.findOne({ email: user.email })
                if (!currentUser) {
                    const newUser = await User.create({
                        email: user.email,
                        username: user.email.split("@")[0],
                    })
                    user.name = newUser.username
                }
                return true
            }
        },

        async session({ session, user, token }) {
            const dbUser = await User.findOne({ email: session.user.email })
            session.user.name = dbUser.username
            if(dbUser.profilePic) {
                session.user.profilePic = dbUser.profilePic
            }
            return session
        }
    },
})

export { authOptions as GET, authOptions as POST }