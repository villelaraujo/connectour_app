<template>
    <div class="group flex flex-col w-full border border-neutral-700 transition-colors duration-150 hover:bg-neutral-800">
        <div class="flex justify-between">
            <div class="flex flex-col gap-2 p-4">
                <h2 class="text-xl font-semibold">{{props.city}}</h2>
                <p>{{ props.country }}</p>
            </div>
            <div class="flex flex-col gap-2 p-4">
                <button class="cursor-pointer self-end p-2 transition-colors duration-150 hover:bg-emerald-600">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg>
                </button>
                <p class="text-neutral-500">{{ props.date }}</p>
            </div>
        </div>
        <div class="flex flex-col gap-3 items-center justify-center w-full min-h-48 p-2 bg-neutral-700">
            <div class="flex p-2 w-full h-full bg-neutral-800">
                <p class="text-neutral-300">{{ props.title }}</p>
            </div>
            <div class="flex p-2 w-full h-full bg-neutral-800">
                <p class="text-neutral-400">{{ props.log }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: {type:String, required:true},
        log: {type:String, required:true},
        city: {type:String, required:true},
        country: {type:String, required:true},
        date:{type:String, required:true},
        pinned: {type:Boolean, required:true},
    })
</script>

<style scoped>
    svg{
        fill: white;
    }
</style>