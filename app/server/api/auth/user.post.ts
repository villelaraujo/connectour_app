import validator from 'validator';

export default defineEventHandler(async (event)=>{
    try {
        const body = await readBody(event);
        if(verifyBody(body)){
            const hashedPassword = await genHash(body.password);
            const user = await prisma.user.create({
                data:{
                    email:body.email,
                    name:body.username,
                    password:hashedPassword.hash,
                    salts:hashedPassword.salt
                }
            });
            console.log('User registered');
            sendRedirect(event, '/login');
            return {message: "Successfull user registration"};
        }
        throw new Error("Invalid user data");
    } catch (error:any) {
        console.error(error.code)
        if(error.code === 'P2002'){
            throw createError({statusCode: 409, statusMessage: "Email already in use", statusText: "Email already in use"});
        }
        throw createError({statusCode: 406, statusMessage: "Invalid user data", statusText: "Invalid user data"});
    }
});

function verifyBody(body: any): boolean{
    const {email,username,password} = body;
    if(!email || !username || !password) return false;
    if(typeof email !== 'string' || typeof username !== 'string' || typeof password !== 'string') return false;
    if(!validator.isEmail(email)) return false;
    if(password.length < 6) return false;
    if(username.length < 2 || username.length > 20) return false;
    return true;
}