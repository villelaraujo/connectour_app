import { getUserInDB } from "#imports";

export default defineEventHandler(async (event)=>{
    try {
        const body:any|undefined = await readBody(event);
        const user = await getUserInDB(event);
        if(!user){
            throw new Error('Unauthorized');
        }
        if(body.logId){
            await prisma.log.delete({
                where:{
                    logbookId:parseInt(body.logbookId),
                    id:parseInt(body.logId),
                }
            })
            return {message:'success'};
        }
        throw new Error('Error deleting Log',body);
    } catch (error) {
        console.error(error);
    }
});