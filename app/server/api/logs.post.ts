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
        if(validateLog(body)){
            const logs = await prisma.log.create({
                data:{
                    logbookId:body.logbookId,
                    title:body.title,
                    city:body.city,
                    country:body.country,
                    log:body.log,
                    pinned:body.pinned || false,
                }
            })
            return {message:'success'};
        }
        throw new Error('Error creating Log');
    } catch (error) {
        console.error(error);
    }
});

function validateLog(body:any):boolean{
    if(!body.title || typeof body.title !== 'string') return false;
    if(body.title.length < 1 || body.title.length > 100) return false;
    if(!body.city || typeof body.city !== 'string') return false;
    if(body.city.length < 1 || body.city.length > 100) return false;
    if(!body.country || typeof body.country !== 'string') return false;
    if(body.country.length < 1 || body.country.length > 100) return false;
    if(!body.log || typeof body.log !== 'string') return false;
    if(body.log.length < 1 || body.log.length > 500) return false;
    return true;
};