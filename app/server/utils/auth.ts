import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {prisma} from "./db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {provider: "postgresql"},),
    appName:"Connectour",
    experimental: {joins:true},
    emailAndPassword:{
        enabled:true,
        autoSignIn:false,
        minPasswordLength:6,
        requireEmailVerification:false,
    },
    advanced:{
        defaultCookieAttributes:{
            sameSite:'none',
            secure: true,
            httpOnly: true,
        }
    }
    
});