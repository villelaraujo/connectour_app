<template>
    <div class="group flex flex-col w-full border border-neutral-700 transition-colors duration-150 hover:bg-neutral-800">
        <div class="flex justify-between">
            <div class="flex flex-col gap-2 p-4">
                <h2 class="text-xl font-semibold">{{props.city}}</h2>
                <p>{{ props.country }}</p>
            </div>
            <div class="flex flex-col gap-2 p-4">
                <div class="flex gap-2 items-center self-end">
                    <button class="cursor-pointer p-2 transition-colors duration-150 hover:bg-emerald-600">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg>
                    </button>
                    <button @click="deleteLog" class="cursor-pointer p-2 transition-colors duration-150 hover:bg-red-900">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>                    
                    </button>
                </div>
                <p class="text-neutral-500">{{ props.date }}</p>
            </div>
        </div>
        <div class="flex flex-col gap-3 items-center justify-center w-full p-2 bg-neutral-700">
            <div class="flex p-2 w-full h-full bg-neutral-800">
                <p class="text-neutral-300 wrap-anywhere">{{ props.title }}</p>
            </div>
            <div class="flex p-2 w-full min-h-32 bg-neutral-800">
                <p class="text-neutral-400 wrap-anywhere">{{ props.log }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        id: {type:Number, required:true},
        title: {type:String, required:true},
        log: {type:String, required:true},
        city: {type:String, required:true},
        country: {type:String, required:true},
        date:{type:String, required:true},
        pinned: {type:Boolean, required:true},
    })
    const emit = defineEmits(['delete-log']);

    function deleteLog(){
        emit('delete-log', props.id);
        return;
    };
</script>

<style scoped>
    svg{
        fill: white;
    }
</style>