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

export async function getUserInDB(event:any): Promise<any> {
    const session = await fetchUserSession(event);
    const userInDB = await prisma.user.findUnique({
        where:{id: session?.user.id}
    });
    if(!userInDB){
        throw createError({statusCode:401, message:"Unauthorized: user not found in database"});
    }
    return userInDB;
};