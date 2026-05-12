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
        if(body.edit){
            console.log('edit log endpoint');
            return {success:true, message: 'edit log endpoint reached'};
            //implement edit log func
        }

        prisma.log.update({
            where:{logbookId: body?.logbookId, id: parseInt(body?.logId)},
            data:{pinned: body?.pinned}
        });
        throw new Error('Error updating Log',body);
    } catch (error) {
        console.error(error);
    }
});