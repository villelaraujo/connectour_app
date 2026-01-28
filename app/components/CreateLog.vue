<script setup>
    const props = defineProps({
        logbookId:{type:Number,required:true}
    });

    const emit = defineEmits(['add-log']);

    let canAddLog = false;
    const log = reactive({
        title:"",
        city:"",
        country:"",
        log:"",
        pinned:false,
    })
    watch(log, (newLog)=>{
        if(newLog.title.length>0 && newLog.city.length>0 && newLog.log.length>0 && newLog.country.length>0){
            canAddLog = true;
        }else{
            canAddLog = false;
        }
    })
   function getDate() {
        const now = Date.now();
        const date = new Date(now);
        return date.toLocaleDateString('en-US', {year: "numeric", month: "numeric", day: "numeric"});
    };
    function addLog(){
        emit('add-log', {
            city:log.city,
            country:log.country,
            title:log.title,
            log:log.log,
            pinned:log.pinned,
        });
        log.title="";
        log.city="";
        log.country="";
        log.log="";
        log.pinned=false;
        return;
    };
</script>

<template>
    <div class="group flex flex-col w-full">
        <div class="flex flex-col gap-3 items-center justify-center w-full min-h-48 p-2 bg-neutral-800">
            <div class="flex p-2 w-full h-full bg-neutral-800">
                <input v-model="log.city" placeholder="Enter Place or City name" type="text" class="w-full p-2 text-center bg-neutral-700 placeholder:text-neutral-500">
            </div>
            <div class="flex p-2 w-full h-full bg-neutral-800">
                <input v-model="log.country" placeholder="Enter Country name" type="text" class="w-full p-2 text-center bg-neutral-700 placeholder:text-neutral-500">
            </div>
            <div class="flex p-2 w-full h-full bg-neutral-800">
                <input v-model="log.title" placeholder="Name your Log" type="text" class="w-full p-2 text-center bg-neutral-700 placeholder:text-neutral-500">
            </div>
            <div class="flex p-2 w-full h-full bg-neutral-800">
                <textarea v-model="log.log" type="text" class="w-full min-h-48 p-2 bg-neutral-700 placeholder:text-neutral-500"></textarea>
            </div>
            <button @click="addLog" class="cursor-pointer flex gap-3 items-center justify-center w-full p-2 bg-transparent transition-all duration-150 hover:bg-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                <p>Add Log</p>
            </button>
        </div>
    </div>
</template>