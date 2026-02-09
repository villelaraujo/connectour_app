import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event)=>{
    try {
        const token = getCookie(event,'auth_token');
        if(!token){
            throw new Error('Unauthorized');
        }
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
        if(!decoded){
            throw new Error('Unauthorized');
        }
        deleteCookie(event,'auth_token');
        return {message:'success'};
    } catch (error) {
        console.error(error);
    }
});