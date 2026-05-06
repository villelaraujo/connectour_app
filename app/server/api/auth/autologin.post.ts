import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event)=>{
    try {
        const token = getCookie(event, 'auth_token');
        if(!token) return;
        const decoded:any = jwt.verify(token as string, process.env.JWT_SECRET as string);
        if(!decoded) return;
        const user = await prisma.user.findUnique({
            where:{id: decoded.userId}
        })
        if(!user) return;
        return {message: "User token is valid", logged:true};
    } catch (error) {
        console.error('Autologin error:', error);
    }
})