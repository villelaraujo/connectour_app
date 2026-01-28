import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event)=>{
    try {
        const token = getCookie(event, 'auth_token');
        if(!token){
            sendRedirect(event, '/login');
        }
        const decoded:any|undefined = jwt.verify(token as string, process.env.JWT_SECRET as string)
        if(!decoded){
            sendRedirect(event, '/login');
        }
        const logbooks = await prisma.logbook.findMany({
            where:{
                userId:decoded.userId
            }
        });
        return logbooks;        
    } catch (error) {
        console.error(error);
    }
});