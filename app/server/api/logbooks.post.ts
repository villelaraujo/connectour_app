import { getUserInDB } from "../utils/session";

export default defineEventHandler(async (event)=>{
    try {
        const user:any = await getUserInDB(event);
        if(!user){
            throw createError({statusCode:401, message:"Unauthorized on logbooks endpoint"});
        }
        const body = await readBody(event);
        if(body.name){
            await prisma.logbook.create({
                data:{
                    name:body.name,
                    userId:user?.id,
                },
            });
            return {message:'success'};
        }
        throw new Error('Error creating new LogBook');
    } catch (error) {
        console.error(error);
    }
});