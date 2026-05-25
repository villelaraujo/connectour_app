<template>
    <div class="flex flex-col gap-4 items-center">
            <div class="px-6 py-12 my-4 border border-neutral-700 bg-neutral-900 shadow-lg">
                <h1 class="text-lg mb-4">Register new account</h1>
                <div :class="hasError?'flex':'hidden'" class="justify-center w-full p-2 my-3 bg-red-950 border border-red-900">
                    <p class="text-red-500">{{errorMessage}}</p>
                </div>
                <form @submit.prevent="submitRegister">
                    <div class="flex flex-col gap-6">
                        <div class="flex flex-col gap-3 w-[60vw] max-w-100">
                            <label for="email">Email</label>
                            <input v-model.trim="email" class="peer px-4 py-2 text-white border border-neutral-500 focus:outline-none focus:border-emerald-500" type="email" required>
                            <p class="text-sm opacity-0 transition-opacity duration-200 peer-focus:opacity-50">User email</p>
                        </div>
                        <div class="flex flex-col gap-3 w-[60vw] max-w-100">
                            <label for="username">Username</label>
                            <input v-model.trim="username" class="peer px-4 py-2 text-white border border-neutral-500 focus:outline-none focus:border-emerald-500" type="text" required>
                            <p class="text-sm opacity-0 transition-opacity duration-200 peer-focus:opacity-50">Username must be between 2 and 20 characters</p>
                        </div>
                        <div class="flex flex-col gap-3 w-[60vw] max-w-100">
                            <label for="password">Password</label>
                            <div class="peer flex gap-1">
                                <div class="flex flex-col gap-3 flex-2">
                                    <input v-model.trim="password" class="peer px-4 py-2 text-white border border-neutral-500 focus:outline-none focus:border-emerald-500" :type="showPassword?'text':'password'" required>
                                    <p class="text-sm opacity-0 transition-opacity duration-200 peer-focus:opacity-50">Password must be at least 8 characters long</p>
                                </div>
                                <button @click="showPassword=!showPassword" type="button" class="cursor-pointer flex items-center justify-center h-11 p-2 transition-colors duration-150 hover:bg-neutral-600 active:bg-neutral-400">
                                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"/></svg>
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-col gap-3 w-[60vw] max-w-100">
                            <label for="password">Confirm Password</label>  
                            <div class="peer flex gap-1">
                                <div class="flex flex-col gap-3 flex-2">
                                    <input v-model.trim="confirmPass" class="peer px-4 py-2 text-white border border-neutral-500 focus:outline-none focus:border-emerald-500" :type="showConfirmPass?'text':'password'" required>
                                    <p class="text-sm opacity-0 transition-opacity duration-200 peer-focus:opacity-50">Confirm your password</p>
                                </div>
                                <button @click="showConfirmPass=!showConfirmPass" type="button" class="cursor-pointer flex items-center justify-center h-11 p-2 transition-colors duration-150 hover:bg-neutral-600 active:bg-neutral-400">
                                    <svg v-if="showConfirmPass" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"/></svg>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="group cursor-pointer py-2 px-4 border border-neutral-700 transition-colors duration-150 hover:border-emerald-500">
                            <span v-if="loadingRegisterBtn" class="loader"></span>
                            <span v-else class="transition-colors duration-150 group-hover:text-emerald-500">Register</span>
                        </button>
                        <div class="flex flex-col gap-4 items-center">
                            <p class="opacity-70">Already have an account?</p>
                            <NuxtLink to="/login" class="cursor-pointer text-white transition-colors duration-150 hover:text-emerald-500">Login</NuxtLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
</template>

<script setup>
import { authClient } from '~/composables/authClient';

    const email = ref('');
    const username = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const showConfirmPass = ref(false);
    const confirmPass = ref('');
    const errorMessage = ref('');
    const hasError = ref(false);

    const loadingRegisterBtn = ref(false);

    async function submitRegister(){
        loadingRegisterBtn.value = true;
        if(!email.value.includes('@')){
        hasError.value = true;
        errorMessage.value = 'Please enter a valid email address.';
        return;
        }
        if(username.value.length < 2 || username.value.length > 20)
        {
            hasError.value = true;
            errorMessage.value = 'Username must be between 2 and 20 characters.';
            return;
        }
        if(password.value !== confirmPass.value){
            hasError.value = true;
            errorMessage.value = 'Password mismatch.';
            return;
        }

        try {
            const {data, error} = authClient.signUp.email(
                {
                    email:email,
                    password:password,
                    name:username,
                },
                {
                    onRequest:(ctx)=>{loadingRegisterBtn.value = true;}
                },
                {
                    onSuccess:(ctx)=>{navigateTo("/login");}
                },
                {
                    onError:(ctx)=>{throw new Error(ctx.error.message || 'Error registering user');}
                }
            );
            console.log(response);
            if(response){
                navigateTo('/login?registered=true');
                return;
            }
            loadingRegisterBtn.value = false;
            return;
        } catch (error) {
            console.error('Error registering user:', error.response?._data?.message);
            hasError.value = true;
            errorMessage.value = error.response?._data?.message;
            loadingRegisterBtn.value = false;
        }
    };
</script>