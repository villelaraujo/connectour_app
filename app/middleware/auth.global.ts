import { authClient } from "~/lib/authClient";

export default defineNuxtRouteMiddleware(async (to)=>{
    if(import.meta.client){
        if(checkPublicUrl(to)) return;
        const {data: session} = await authClient.useSession(useAuthFetch);
        console.log("Session in middleware:", session.value);
        if(!session.value) {
            return await navigateTo('/login');
        }
    }
});

function checkPublicUrl(event:any): boolean{
    console.log(event.path);
    const publicUrl = ['/api/auth/login', '/api/auth/user', '/login', '/account'];
    const isPublic = publicUrl.some(url => event.path.includes(url));
    if(isPublic) return true;
    return false;
};