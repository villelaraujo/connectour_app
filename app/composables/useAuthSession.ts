import { authClient } from "~/lib/authClient";

export default function useAuthFetch(url:string, options?: any){
    const client = authClient;
    try {
        if(url.startsWith('http')) url = new URL(url).pathname;
    } catch (error) {
        console.error('Error parsing URL:', error);
    }
    return useFetch(url, options) as any;
}