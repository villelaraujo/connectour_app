import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const user = await prisma.user.findFirst({
        where:{
            email:body.email
        }
    });
    const token = jwt.sign({userId: user?.id}, process.env.JWT_SECRET as string,{ expiresIn: '1d'});
    setCookie(event, 'auth_token', token)
});