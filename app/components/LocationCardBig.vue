<template>
    <div class="group flex flex-col w-full border border-neutral-700 transition-colors duration-150 hover:bg-neutral-800">
        <div class="w-full h-48 bg-neutral-700">
            <div class="hidden group-hover:flex p-2 justify-end">
                <div class="flex gap-2">
                    <button class="cursor-pointer flex items-center p-2 shadow-md bg-emerald-900 transition-colors duration-150 hover:bg-emerald-500">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2 p-4">
            <h2 class="text-xl font-semibold">Tokyo</h2>
            <p>Japan</p>
            <p class="opacity-60">The land of the rising sun</p>
        </div>
    </div>
</template>

<style scoped>
    svg{
        fill: white;
    }
</style>