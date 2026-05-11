import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event)=>{
    try {
        const token = getCookie(event, 'auth_token');
        if(!token){
            throw createError({statusCode: 409, statusMessage: "invalid_token", statusText: "Unauthorized"});
        };
        const body = await readBody(event);
        if(!body.password || typeof body.password !== 'string' || body.password.length < 2) {
            throw createError({statusCode: 409, statusMessage: "invalid_pass", statusText: "Invalid password"});
        };
        const decoded:any|undefined = jwt.verify(token as string, process.env.JWT_SECRET as string);
        const user:any = await prisma.user.findUnique({where: {id: decoded?.userId, email: body?.email}});
        const isValid = await compareHash(body?.password,user.password);
        if(!isValid){
            throw createError({statusCode: 409, statusMessage: "invalid_pass", statusText: "Invalid password"});
        }
        await prisma.user.delete({where: {id: decoded?.userId,email: body?.email}});
        deleteCookie(event, 'auth_token');
        return {success: true, message: "User deleted"};
    } catch (error:any) {
        console.error(error);
        throw createError({statusCode: 500, statusMessage: "internal_error", statusText: "Internal Server Error"});
    }
});