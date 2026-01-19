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
                            <input v-model.trim="password" class="peer px-4 py-2 text-white border border-neutral-500 focus:outline-none focus:border-emerald-500" type="password" required>
                            <p class="text-sm opacity-0 transition-opacity duration-200 peer-focus:opacity-50">Password must be at least 8 characters long</p>
                        </div>
                        <div class="flex flex-col gap-3 w-[60vw] max-w-100">
                            <label for="password">Confirm Password</label>  
                            <input v-model.trim="confirmPass" class="peer px-4 py-2 text-white border border-neutral-500 focus:outline-none focus:border-emerald-500" type="password" required>
                            <p class="text-sm opacity-0 transition-opacity duration-200 peer-focus:opacity-50">Confirm your password</p>
                        </div>
                        <button type="submit" class="group cursor-pointer py-2 px-4 border border-neutral-700 transition-colors duration-150 hover:border-emerald-500">
                            <span class="transition-colors duration-150 group-hover:text-emerald-500">Register</span>
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
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const confirmPass = ref('');
    const errorMessage = ref('');
    const hasError = ref(false);

    async function submitRegister(){
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
            const response = await $fetch('/api/auth/user', {
                method: 'POST',
                body: {
                    email: email.value,
                    username: username.value,
                    password: password.value
                }
            });
            console.log(response);
        } catch (error) {
            console.error('Error registering user:', error.response?._data?.message);
            hasError.value = true;
            errorMessage.value = error.response?._data?.message;
        }
    };
</script>