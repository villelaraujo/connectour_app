import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event)=>{
    try {
        const body = await readBody(event);
        const user = await prisma.user.findUnique({
            where:{
                email:body.email
            }
        });
        if(!user){
            //sendRedirect(event, '/login?error=InvalidCredentials');
            throw new Error("Invalid credentials");
        }
        const isValid = await bcrypt.compare(body.password, user.password);
        if(!isValid){
            //sendRedirect(event, '/login?error=InvalidCredentials');
            throw new Error("Invalid credentials");
        }
        const token = jwt.sign({userId: user?.id}, process.env.JWT_SECRET as string,{ expiresIn: '1d'});
        setCookie(event, 'auth_token', token)
        sendRedirect(event, '/');
        return {message: "Successful login"};       
    } catch (error) {
        console.error('Login error:', error);
        throw createError({statusCode: 401, statusMessage: "Invalid credentials", statusText: "Invalid credentials"})
    }

});