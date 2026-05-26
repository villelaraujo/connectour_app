import { authClient } from "~/lib/authClient";

export default defineNuxtRouteMiddleware(async (to)=>{
    if(checkPublicUrl(to)) return;
    const {data: session} = await authClient.useSession(useFetch);
    if(!session.value) {
        return navigateTo('/login');
    }
});

function checkPublicUrl(event:any): boolean{
    const publicUrl = ['/api/auth/login', '/api/auth/user', '/login', '/account'];
    const isPublic = publicUrl.some(url => event.path.includes(url));
    if(isPublic) return true;
    return false;
};