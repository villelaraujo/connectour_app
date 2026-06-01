import {auth} from "./auth";

export async function fetchUserSession(event:any){
    try {
        const session = await auth.api.getSession({headers: event.headers});
        if(!session?.user){
            throw createError({statusCode:401, message:"Unauthorized: user not found in session"});
        }
        return {user: session.user};
    } catch (error) {
        console.error(error);
    }
};