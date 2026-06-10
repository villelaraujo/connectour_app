import { getUserInDB } from "#imports";
import {auth} from "../utils/auth";

export default defineEventHandler(async (event)=>{
    try {
        const user = await getUserInDB(event);
        if(!user){
            throw new Error('Unauthorized');
        }
        const result = await auth.api.signOut({headers: event.headers});
        if(result.success) return {message:'success'};
        return {message:'failed'};
    } catch (error) {
        console.error(error);
    }
});