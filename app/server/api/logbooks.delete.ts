import jwt from 'jsonwebtoken';
import { getUserInDB } from '../utils/session';

export default defineEventHandler(async (event)=>{
    try {
        const user:any = await getUserInDB(event);
        if(!user){
            throw createError({statusCode:401, message:"Unauthorized on logbooks endpoint"});
        }
        const body:any|undefined = await readBody(event);
        if(body.logbookId){
            await prisma.logbook.delete({
                where:{
                    id:parseInt(body.logbookId),
                    userId:user?.id,
                }
            })
            return {message:'success'};
        }
        throw new Error('Error deleting Log',body);
    } catch (error) {
        console.error(error);
    }
});