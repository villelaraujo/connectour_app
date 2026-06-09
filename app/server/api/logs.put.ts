import { getUserInDB } from "#imports";

export default defineEventHandler(async (event)=>{
    try {
        const body:any|undefined = await readBody(event);
        const user:any = await getUserInDB(event); 
        if(!user){
            throw new Error('Unauthorized');
        }
        if(body.edit){
            console.log('edit log endpoint');

            await prisma.log.update({
                where:{logbookId: parseInt(body?.logbookId), id: parseInt(body?.logId)},
                data:{log: body?.logMessage}
            })
            return {success:true, message: 'Log Message Updated'};  
        }
        await prisma.log.update({
            where:{logbookId: parseInt(body?.logbookId), id: parseInt(body?.logId)},
            data:{pinned: body?.pinned}
        });
        return {success:true, message: 'Log Updated'};
    } catch (error) {
        console.error(error);
    }
});