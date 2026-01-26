<template>
    <div @mouseleave="showAddLogbook=false" class="flex flex-col flex-1 w-full h-fit p-4 gap-4 border border-neutral-700">
        <div class="flex items-center justify-center gap-3 w-full pt-2 pb-4 border-b border-neutral-700">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M240-80q-50 0-85-35t-35-85v-560q0-50 35-85t85-35h440v640H240q-17 0-28.5 11.5T200-200q0 17 11.5 28.5T240-160h520v-640h80v720H240Zm120-240h240v-480H360v480Zm-80 0v-480h-40q-17 0-28.5 11.5T200-760v447q10-3 19.5-5t20.5-2h40Zm-80-480v487-487Z"/></svg>
            <h1 class="font-semibold text-md">My LogBooks</h1>
        </div>
        <div v-if="logbooks.length>0">
            <ul class="flex flex-col items-center gap-2">
                <li :id="logbook.id" class="w-full" v-for="logbook in logbooks">
                    <button class="cursor-pointer w-full p-2 bg-transparent transition-all duration-150 hover:bg-neutral-800">
                        <span>{{logbook.name}}</span>
                    </button>
                </li>
            </ul>           
        </div>
        <div v-else class="flex justify-center py-4">
            <p class="text-neutral-700">No LogBooks found</p>
        </div>
        <div v-if="showAddLogbook" class="flex flex-col gap-3 pt-4 items-center justify-center w-full border-t border-neutral-700">
            <input v-model="newLogbookName" placeholder="Name your LogBook" type="text" class="w-full p-2 text-center bg-neutral-700 placeholder:text-neutral-500">
            <button @click="addLogbook" v-if="newLogbookName.length>0" class="cursor-pointer flex gap-3 items-center justify-center w-full p-2 bg-emerald-900 transition-all duration-150 hover:bg-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                <p>Add</p>
            </button>
            <button v-else class="flex gap-3 items-center justify-center w-full p-2 bg-neutral-700">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                <p>Add</p>
            </button>
        </div>
        <div v-else class="flex gap-3 pt-4 items-center justify-center w-full border-t border-neutral-700">
            <button @click="showAddLogbook=true" class="cursor-pointer flex gap-3 items-center justify-center w-full p-2 bg-transparent transition-all duration-150 hover:bg-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                <p>Add new LogBook</p>
            </button>
        </div>
    </div>
</template>

<script setup>
    const logbooks = ref([]);
    const newLogbookName = ref('');
    const showAddLogbook = ref(false);

    let userId = inject('providedId');

    onMounted(async ()=>{
        await fetchLogbooks();
    });
    async function addLogbook(){
        try {
            const logbookName = newLogbookName.value;
            const response = await $fetch('/api/logbooks',{
                method:'POST',
                body:{
                    name:logbookName,
                    userId:userId
                },
            });
            if(response?.message === 'success'){
                await fetchLogbooks();
                newLogbookName.value = '';
                showAddLogbook.value = false;
                return;
            }         
        } catch (error) {
            console.error(error);
        }
    };
    async function fetchLogbooks(){
        try {
            const response = await $fetch('/api/logbooks');
            if(response){
                logbooks.value = response;
            }
        } catch (error) {
            console.error(error);
        }
    };
</script>