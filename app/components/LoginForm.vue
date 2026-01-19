<template>
    <div class="flex flex-col gap-4 items-center">
            <div class="px-6 py-12 my-4 border border-neutral-700 bg-neutral-900 shadow-lg">
                <h1 class="text-lg mb-4">Login to <span class="text-lg font-semibold text-emerald-500">Connectour</span></h1>
                <div :class="userRegistered?'flex':'hidden'" class="justify-center w-full p-2 my-3 bg-green-950 border border-green-900">
                    <p class="text-green-500">User registered successfully</p>
                </div>
                <div :class="hasError?'flex':'hidden'" class="justify-center w-full p-2 my-3 bg-red-950 border border-red-900">
                    <p class="text-red-500">{{errorMessage}}</p>
                </div>
                <form action="post" @submit.prevent="submitLogin">
                    <div class="flex flex-col gap-6">
                        <div class="flex flex-col gap-3 w-[60vw] max-w-100">
                            <label  for="email">User Email</label>
                            <input v-model="email" class="peer px-4 py-2 text-white border border-neutral-500 focus:outline-none focus:border-emerald-500" type="text" required>
                            <p class="text-sm opacity-0 transition-opacity duration-200 peer-focus:opacity-50">Cannot be empty</p>
                        </div>
                        <div class="flex flex-col gap-3 w-[60vw] max-w-100">
                            <div class="flex justify-between">
                                <label  for="password">Password</label>
                                <p class="cursor-pointer text-sm text-neutral-400 transition-colors duration-150 hover:text-emerald-500">Forgot my Password</p>
                            </div>
                            <input v-model="password" class="peer px-4 py-2 text-white border border-neutral-500 focus:outline-none focus:border-emerald-500" type="password" required>
                            <p class="text-sm opacity-0 transition-opacity duration-200 peer-focus:opacity-50">Password must be at least 8 characters long</p>
                        </div>
                        <button type="submit" class="group cursor-pointer py-2 px-4 border border-neutral-700 transition-colors duration-150 hover:border-emerald-500">
                            <span class="transition-colors duration-150 group-hover:text-emerald-500">Login</span>
                        </button>
                        <div class="flex flex-col gap-6 items-center">
                            <div class="h-px w-full bg-neutral-700"></div>
                            <div class="flex flex-col gap-4 w-full">
                                <button class="cursor-pointer flex justify-center gap-3 py-2 px-4 w-full border border-neutral-500 bg-neutral-100 rounded-xl transition-shadow duration-150 hover:shadow-md shadow-emerald-500">
                                    <img src="~/assets/svg/google.png" alt="google login" class="h-6">
                                    <p class="text-neutral-800">Login with Google</p>
                                </button>
                                <button class="cursor-pointer flex justify-center gap-3 py-2 px-4 w-full border border-neutral-500 bg-neutral-100 rounded-xl transition-shadow duration-150 hover:shadow-md shadow-emerald-500">
                                    <svg width="24" height="24" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
                                    </svg>
                                    <p class="text-neutral-800">Login with Github</p>
                                </button>
                            </div>
                            <div class="h-px w-full bg-neutral-700"></div>
                        </div>
                        
                        <div class="flex flex-col gap-4 items-center">
                            <p class="opacity-70">Don't have an account?</p>
                            <NuxtLink to="/account" class="cursor-pointer text-white transition-colors duration-150 hover:text-emerald-500">Register new Account</NuxtLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
</template>

<script setup>
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const hasError = ref(false);
    const userRegistered = ref(false);

    if(useRoute().query.registered === 'true'){
        userRegistered.value = true;
    }
    if(useRoute().query.error){
        hasError.value = true;
        errorMessage.value = 'Invalid credentials.';
    }

    async function submitLogin(){
        try {
            await $fetch('/api/auth/login', {
                method: 'POST',
                body: {
                    email: email.value,
                    password: password.value
                }
            });
        } catch (error) {
            console.error('Error at login:', error.response?._data?.message);
            hasError.value = true;
            errorMessage.value = error.response?._data?.message;
        }
    };
</script>