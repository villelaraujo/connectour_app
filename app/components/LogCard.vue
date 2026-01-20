<template>
    <div class="group flex flex-col w-full border border-neutral-700 transition-colors duration-150 hover:bg-neutral-800">
        <div class="flex flex-col gap-2 p-4">
            <h2 class="text-xl font-semibold">{{props.city}}</h2>
            <p>{{ props.country }}</p>
        </div>
        <div class="flex items-center justify-center w-full min-h-48 p-2 bg-neutral-700">
            <div class="flex p-2 w-full h-full bg-neutral-800">
                <p class="text-neutral-400">{{ props.log }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        log: {type: String, required:true},
        city: {type:String, required:true},
        country: {type:String, required:true},
    })
</script>

<style scoped>
    svg{
        fill: white;
    }
</style>