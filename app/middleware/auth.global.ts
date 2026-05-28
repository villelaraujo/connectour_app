import { authClient } from "~/lib/authClient";

export default defineNuxtRouteMiddleware(async (to)=>{
    if(checkPublicUrl(to)) return;
    const {data: session} = await authClient.useSession(useFetch);
    console.log("Session in middleware:", session.value);
    if(!session.value) {
        return navigateTo({path:'/login'});
    }
});

function checkPublicUrl(event:any): boolean{
    const publicUrl = ['/api/auth/login', '/api/auth/user', '/login', '/account'];
    const isPublic = publicUrl.some(url => event.path.includes(url));
    if(isPublic) return true;
    return false;
};