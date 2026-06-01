import { fetchUserSession } from "../utils/session";

export default defineEventHandler(async (event)=>{
    try {
        const user:any = await fetchUserSession(event);
        console.log('logbooks endpoint | user', user);
        if(!user) return createError({statusCode:401, message:"Unauthorized: user session not found"});
        const logbooks = await prisma.logbook.findMany({
            where:{
                userId:user?.id
            }
        });
        return logbooks;        
    } catch (error) {
        console.error(error);
    }
});