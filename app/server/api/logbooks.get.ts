export default defineEventHandler(async (event)=>{
    const logbooks = await prisma.logbook.findMany({
        where:{
            
        }
    })
});