import {auth} from "../utils/auth";

export default defineEventHandler(async (event)=>{
    try {
        if(checkPublicUrl(event)) return;
        const session = await auth.api.getSession({headers: event.headers});
        console.log('session endpoint | session data:', session);
        if(!session?.user){
            throw createError({statusCode:401, message:"Unauthorized: user not found in session"});
        }
        console.log('userdata endpoint | user found', session.user);
        return {user: session.user};

    } catch (error) {
        console.error(error);
    }
});

function checkPublicUrl(event:any): boolean{
    const publicUrl = ['/api/auth/login', '/api/auth/user', '/login', '/account'];
    const isPublic = publicUrl.some(url => event.path.includes(url));
    if(isPublic) return true;
    return false;
};