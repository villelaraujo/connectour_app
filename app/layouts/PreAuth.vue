<template>
    <div>
        <div class="relative -z-10">
            <div class="absolute top-0 left-0 w-screen h-screen gradient-bg"></div>
        </div>
        <div class="flex h-30 items-center justify-center border-b border-emerald-500 shadow-lg">
            <div class="cursor-pointer group flex flex-col gap-2 items-center">
                <div class="flex gap-2 items-center">
                    <img src="~\assets\svg\global-network.png" alt="logo" class="h-10">
                    <h1 class="text-2xl text-gray-200 font-semibold">Connec<span class="text-emerald-400 group-hover:text-emerald-300">tour</span></h1>
                </div>
                <p class="text-white opacity-60">Make Your World Tour</p>
            </div>
        </div>
        <slot></slot>
    </div>
</template>