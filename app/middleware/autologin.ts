import { authClient } from "~/lib/authClient";
import useAuthFetch from "~/composables/useAuthFetch";

export default defineNuxtRouteMiddleware(async (to, from) =>{
    const {data:session} = await authClient.useSession(useAuthFetch);
    if(!session.value) return;
    return await navigateTo('/');
});