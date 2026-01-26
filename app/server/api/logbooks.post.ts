export default defineEventHandler(async (event)=>{
    try {
        const body = await readBody(event);
        if(body.name){
            const logbooks = await prisma.logbook.create({
                data:{
                    name:body.name,
                    userId:body.userId
                },
            });
            return {message:'success'};
        }
        throw new Error('Error creating new LogBook');
    } catch (error) {
        console.error(error);
    }
});