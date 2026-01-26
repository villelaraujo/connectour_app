export default defineEventHandler(async (event)=>{
    try {
        const logbooks = await prisma.logbook.findMany();
        return logbooks;        
    } catch (error) {
        console.error(error);
    }
});