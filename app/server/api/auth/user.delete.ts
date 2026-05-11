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

        await prisma.user.delete({where: {id: decoded.id, password: body?.password}});
        deleteCookie(event, 'auth_token');
        return {success: true, message: "User deleted"};
    } catch (error:any) {
        console.error(error);
        throw createError({statusCode: 500, statusMessage: "internal_error", statusText: "Internal Server Error"});
    }
});