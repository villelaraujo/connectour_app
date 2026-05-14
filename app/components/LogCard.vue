<template>
    <div class="group flex flex-col w-full border border-neutral-700 transition-colors duration-150 hover:bg-neutral-800">
        <div class="flex justify-between">
            <div class="flex flex-col gap-2 p-4">
                <h2 class="text-xl font-semibold">{{props.city}}</h2>
                <p>{{ props.country }}</p>
            </div>
            <div class="flex flex-col gap-2 p-4">
                <div class="flex gap-2 items-center self-end">
                    <div v-if="editMode" class="flex gap-2 items-center">
                        <button @click="editMode=false" class="group cursor-pointer flex items-center justify-center p-2 bg-neutral-700 transition-colors duration-150 hover:bg-red-900">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>                        
                        </button>
                        <button @click="applyEdit" class="group cursor-pointer flex items-center justify-center p-2 bg-neutral-700 transition-colors duration-150 hover:bg-emerald-600">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>                        
                        </button>
                    </div>
                    <div v-else>
                        <button @click="editMode=true" class="cursor-pointer p-2 transition-colors duration-150 hover:bg-emerald-600">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>                    
                        </button>
                    </div>
                    <button @click="togglePin" :class="props.pinned? 'bg-emerald-800': 'bg-none'" class="cursor-pointer p-2 transition-colors duration-150 hover:bg-emerald-600">
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
            <div v-if="editMode" class="flex p-2 w-full min-h-32 bg-neutral-800">
                <textarea v-model="editedMessage" type="text" class="w-full min-h-48 p-2 bg-neutral-700 placeholder:text-neutral-500"></textarea>
            </div>
            <div v-else class="flex p-2 w-full min-h-32 bg-neutral-800">
                <p class="text-neutral-400 wrap-anywhere">{{ props.log }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        id: {type:Number, required:true},
        logbookId: {type:Number, required:true},
        title: {type:String, required:true},
        log: {type:String, required:true},
        city: {type:String, required:true},
        country: {type:String, required:true},
        date:{type:String, required:true},
        pinned: {type:Boolean, required:true},
    })
    const emit = defineEmits(['delete-log', 'toggle-pin', 'edit-log']);
    const editMode = ref(false);
    const editedMessage = ref(props.log);

    function deleteLog(){
        emit('delete-log', props.id);
        return;
    };
    function togglePin(){
        emit('toggle-pin', props.id, props.pinned);
        return;
    };
    function applyEdit(){
        emit('edit-log', props.id, editedMessage.value);
        editMode.value = false;
    };
</script>

<style scoped>
    svg{
        fill: white;
    }
</style>