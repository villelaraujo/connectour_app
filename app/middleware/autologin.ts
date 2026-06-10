import { authClient } from "~/lib/authClient";
import useAuthFetch from "~/composables/useAuthFetch";

export default defineNuxtRouteMiddleware(async (to, from) =>{
    const {data:session} = await authClient.useSession(useAuthFetch);
    if(!session.value) return;
    const user = await prisma.user.findUnique({
        where: {id: session?.value.user.id}
    });
    if(!user) return;
    return await navigateTo('/');
});