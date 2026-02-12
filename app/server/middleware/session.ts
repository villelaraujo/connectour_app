import jwt from "jsonwebtoken"

export default defineEventHandler(async (event)=>{
    try {
        if(checkPublicUrl(event)) return;
        const token = getCookie(event, 'auth_token');
        if(!token){
        sendRedirect(event, '/login');
        }
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string)
        if(!decoded){
        sendRedirect(event, '/login');
        throw createError({statusCode: 401, statusMessage: "Unauthorized", statusText: "Unauthorized, wrong session"});
    }
    return;
    } catch (error) {
        console.error('JWT verification error:',error);
    }
})

function checkPublicUrl(event:any): boolean{
    const publicUrl = ['/api/auth/login', '/api/auth/user', '/login', '/account'];
    const isPublic = publicUrl.some(url => event.path.includes(url));
    if(isPublic) return true;
    return false;
};