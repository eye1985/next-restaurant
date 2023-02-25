import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectToDB, getAdminUser} from "@/lib/db";

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge:1800
    },
    pages:{
        signIn:"/login",
    },
    callbacks:{
      async redirect({url, baseUrl}){
          if(url.includes("/login")){
              return baseUrl + "/admin";
          }

          return baseUrl;
      }
    },
    providers: [
        CredentialsProvider({
            name:"Credentials",
            type: "credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Ola nordmann",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                const { username, password } = credentials;

                const client = await connectToDB();
                if (!client) {
                    throw new Error("Could not cannot to database");
                }

                const adminUser = await getAdminUser(client, username, password);
                if(!adminUser){
                    throw new Error("Incorrect username or password");
                }

                return {
                    id: adminUser._id.toString(),
                    user:adminUser.username
                };
            },
        }),
    ],
};
export default NextAuth(authOptions);
