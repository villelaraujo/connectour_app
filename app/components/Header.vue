<template>
    <div class="flex flex-col items-center w-screen overflow-hidden border-b bg-blend-color border-emerald-500 shadow-lg py-4 z-50">
        <div class="flex justify-between items-center max-w-300 w-full page-padding">
            <div class="group cursor-pointer flex gap-2 items-center">
                <img src="~\assets\svg\global-network.png" alt="logo" class="h-8 md:h-10">
                <h1 class="text-lg md:text-2xl text-gray-200 font-semibold">Connec<span class="text-emerald-400 group-hover:text-emerald-300">tour</span></h1>
            </div>
            <div class="hidden md:flex items-center gap-2 md:gap-4">
                <LinkTo to="/" label="Home"/>
                <LinkTo to="/travels" label="Travels"/>
                <LinkTo to="/profile" label="Profile"/>
                <LinkTo to="/connect" label="Connect"/>
            </div>
            <div class="hidden md:flex items-center">
                <LinkTo to="/logout" label="Logout"/>
            </div>
            <div class="cursor-pointer flex md:hidden items-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </div>
        </div>
    </div>
</template>

<style scoped>
    svg{
        height: 32px;
        width: 32px;
        fill: white;
    }
    svg:hover{
        fill: #5ee9b5;
    }
</style>