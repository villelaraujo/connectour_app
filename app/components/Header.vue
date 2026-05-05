<template>
    <div class="flex flex-col items-center w-screen overflow-hidden border-b bg-blend-color border-emerald-500 shadow-lg py-4 z-50">
        <div class="flex justify-between items-center max-w-300 w-full page-padding">
            <div class="group cursor-pointer flex gap-2 items-center">
                <img src="~\assets\svg\global-network.png" alt="logo" class="h-8 md:h-10">
                <h1 class="text-lg md:text-2xl text-gray-200 font-semibold">Connec<span class="text-emerald-400 group-hover:text-emerald-300">tour</span></h1>
            </div>
            <div class="hidden md:flex items-center gap-2 md:gap-4">
                <a href="/" class="cursor-pointer text-sm text-emerald-400 transition-colors duration-150 hover:text-white">Logbook</a>
                <LinkTo to="/profile" label="Profile"/>
                <LinkTo to="/connect" label="Connect"/>
            </div>
            <div class="hidden md:flex items-center">
                <button @click="logout" class="cursor-pointer text-sm text-emerald-400 transition-colors duration-150 hover:text-white">Logout</button>
            </div>
            <button @click="menuOpen=!menuOpen" class="cursor-pointer group flex md:hidden items-center p-2">
                <svg class="group-hover:fill-emerald-300" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </button>
        </div>
    </div>
    <div :class="menuOpen?'h-[80vh] py-8 border-b':'h-0 py-0'" class="flex flex-col items-center w-screen overflow-hidden bg-blend-color border-emerald-500 shadow-lg z-40 transition-normal duration-300">
        <div class="flex flex-col justify-between h-full items-center max-w-300 w-full page-padding text-3xl">
            <div class="flex flex-col items-center gap-8">
                <a href="/" class="cursor-pointer text-emerald-400 transition-colors duration-150 hover:text-white">Logbook</a>
                <nuxt-link @click="menuOpen=!menuOpen" to="/profile" class="text-emerald-400 transition-colors duration-150 hover:text-white">Profile</nuxt-link>
                <nuxt-link @click="menuOpen=!menuOpen" to="/connect" class="text-emerald-400 transition-colors duration-150 hover:text-white">Connect</nuxt-link>
            </div>
            <div class="flex items-center">
                <button @click="logout" class="cursor-pointer text-emerald-400 transition-colors duration-150 hover:text-white">Logout</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    const menuOpen = ref(false);

    async function logout(){
        try {
            const response = await $fetch('/api/logout');
            if(response?.message==='success'){
                navigateTo('/login');
                return;
            }            
        } catch (error) {
            console.error(error);
        }
    };
</script>

<style scoped>
    svg{
        height: 32px;
        width: 32px;
        fill: white;
    }
</style>