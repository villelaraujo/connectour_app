import {auth} from "../utils/auth";

export default defineEventHandler(async (event)=>{
    const session = await auth.api.getSession({headers: event.headers});
    if(!session?.user){
        throw createError({statusCode:401, message:"Unauthorized"});
    }
    return {user: session?.user};
})