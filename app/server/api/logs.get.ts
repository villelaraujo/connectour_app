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
            const logs = await prisma.log.findMany({
                where:{
                    logbookId:body.logbookId
                }
            })
            return logs;
        }
        throw new Error('Error fetching Logs');
    } catch (error) {
        console.error(error);
    }
});