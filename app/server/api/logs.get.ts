import { getUserInDB } from "../utils/session";

export default defineEventHandler(async (event)=>{
    try {
        const params = getQuery(event);
        console.log('logbook route params:', params);
        const user:any = await getUserInDB(event);
        if(!user){
            throw createError({statusCode:401, message:"Unauthorized on logs endpoint"});
        }
        if(params.logbook){
            const logs = await prisma.log.findMany({
                where:{
                    logbookId:parseInt(params.logbook.toString())
                }
            })
            return logs;
        }
        throw new Error('Error fetching Logs');
    } catch (error) {
        console.error(error);
    }
});