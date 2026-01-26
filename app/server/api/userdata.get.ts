import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event)=>{
    try {
        const token = getCookie(event,'auth_token');
        if(!token){
            throw createError({statusCode: 401, statusMessage: "Unauthorized", statusText: "Unauthorized"});
        }
        const decoded:any|undefined = jwt.verify(token as string, process.env.JWT_SECRET as string);
        if(decoded.userId){
            const userdata = await prisma.user.findUnique({
                where:{id:decoded.userId},
            });
            return {username:userdata?.name, id:userdata?.id};
        }
        throw new Error('Token unavaliable');
    } catch (error) {
        console.error(error);
    }
});