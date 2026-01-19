import jwt from "jsonwebtoken"

export default defineEventHandler(async (event)=>{
    if(checkPublicUrl(event)) return;
    const token = getCookie(event, 'auth_token');
    if(!token){
        sendRedirect(event, '/login');
        throw createError({statusCode: 401, statusMessage: "Unauthorized", statusText: "Unauthorized, session may be expired"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    if(!decoded){
        sendRedirect(event, '/login');
        throw createError({statusCode: 401, statusMessage: "Unauthorized", statusText: "Unauthorized, wrong session"});
    }
    return;
})

function checkPublicUrl(event:any): boolean{
    const publicUrl = ['/api/auth/login', '/api/auth/user', '/login', '/register'];
    const isPublic = publicUrl.some(url => event.path.startsWith(url));
    if(isPublic) return true;
    return false;
};