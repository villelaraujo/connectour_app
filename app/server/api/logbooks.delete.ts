import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event)=>{
    try {
        const body:any|undefined = await readBody(event);
        const token = getCookie(event,'auth_token');
        if(!token){
            throw new Error('Unauthorized');
        }
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
        if(!decoded){
            throw new Error('Unauthorized');
        }
        if(body.logbookId){
            await prisma.log.deleteMany({
                where:{logbookId:parseInt(body.logbookId)}
            })
            await prisma.logbook.delete({
                where:{
                    id:parseInt(body.logbookId),
                }
            })
            return {message:'success'};
        }
        throw new Error('Error deleting Log',body);
    } catch (error) {
        console.error(error);
    }
});