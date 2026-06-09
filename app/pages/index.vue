<template> 
    <SectionWrapper id="home">
        <div class="flex flex-col gap-3 w-full">
            <div v-if="createLogMode" class="flex items-center justify-center border p-2 sm:p-4 border-neutral-700">
                <h2 class="text-lg text-neutral-300">Write a Log</h2>
            </div>
            <div v-else class="flex items-center justify-between border p-2 sm:p-4 border-neutral-700">
                <h2 class="text-md md:text-xl font-semibold pl-2 sm:pl-4">Welcome,<span class="pl-2 text-neutral-400">{{session?.user?.name || "none"}}</span></h2>
                <button v-if="$route.query.logbook" @click="toggleCreateMode" class="cursor-pointer flex items-center gap-2 py-2 px-4 bg-neutral-800 border border-neutral-700 shadow-md text-sm sm:text-lg transition-colors duration-150 hover:border-emerald-600 hover:bg-emerald-800">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                    <span>Create Log</span>
                </button>
                <button  v-else class="flex items-center gap-2 py-2 px-4 bg-neutral-800 border border-neutral-700 shadow-md text-sm sm:text-lg">
                    <svg class="fill-neutral-600" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                    <span class="text-neutral-600">Create Log</span>
                </button>
            </div>
            <CreateLog @add-log="onAddLog" v-if="createLogMode" :logbook-id="$route.query.logbook"/>
            <div class="flex flex-col gap-3 md:flex-row">
                <SideMenu />
                <div class="flex flex-2 flex-col gap-4">
                    <div v-if="pinnedLogs.length>0" class="flex-2 flex flex-col gap-4">
                        <div v-for="log in pinnedLogs">
                            <LogCard @edit-log="onEditLog" @delete-log="onDeleteLog" @toggle-pin="onTogglePin" :key="log.logbookId" :id="log.id" :logbook-id="log.logbookId" :log="log.log"
                            :city="log.city" :country="log.country" :date="log.date" :pinned="log.pinned" :title="log.title"/>
                        </div>
                        <div class="w-full h-px bg-neutral-700 my-8"></div>
                    </div>
                    <div v-if="logs.length>0" class="flex flex-col gap-4">
                        <div v-for="log in logs">
                            <LogCard @edit-log="onEditLog" @delete-log="onDeleteLog" @toggle-pin="onTogglePin" :key="log.logbookId" :id="log.id" :logbook-id="log.logbookId" :log="log.log"
                            :city="log.city" :country="log.country" :date="log.date" :pinned="log.pinned" :title="log.title"/>
                        </div>
                    </div>
                    <div v-else class="flex flex-2 items-center justify-center min-h-32">
                        <p class="cursor-default select-none text-neutral-600">This LogBook is empty</p>
                    </div>
                </div>
            </div>
        </div>
    </SectionWrapper>
</template>

<script setup>
    import { authClient } from '~/lib/authClient';

    useHead({
        title: 'Connectour',
    });
    
    const {data:session} = await authClient.useSession(useAuthFetch);

    const route = useRoute();

    const logs = ref([]);
    const pinnedLogs = computed(()=>logs.value.filter(log=>log.pinned));
    const createLogMode = ref(false);

    watch(()=>route.query.logbook, async(newId)=>{
        console.log('logbookId changed', newId);
        await updateLogs();
    });

    onMounted(async()=>{
        try {
            await updateLogs();
            return;
        } catch (error) {
            console.error(error);
        }
    });
    
    function toggleCreateMode(){
        createLogMode.value = !createLogMode.value;
    };
    async function updateLogs() {
        if(!route.query.logbook) return;
        const data = await $fetch('/api/logs',{query:{logbook:route.query.logbook}});
        if(data){
            logs.value = data;
            return;
        }
        return;
    };
    async function onAddLog(createdLog){
        try {
            const data = await $fetch('/api/logs',{
                method:'POST',
                body:{
                    logbookId:route.query.logbook,
                    pinned:createdLog.pinned,
                    city:createdLog.city,
                    country:createdLog.country,
                    title:createdLog.title,
                    log:createdLog.log,
                }
            });
            if(data?.message==='success'){
                await updateLogs();
                createLogMode.value = false;
                return;
            }           
        } catch (error) {
            console.error(error);
        }
    };
    async function onDeleteLog(deletedLogId){
        try {
            const data = await $fetch('/api/logs',{
                method:'DELETE',
                body:{
                    logbookId:route.query.logbook,
                    logId:deletedLogId,
                }
            });
            if(data?.message==='success'){
                await updateLogs();
                return;
            }            
        } catch (error) {
            console.error(error);
        }
    };
    async function onTogglePin(logId,isPinned){
        try {
            isPinned = !isPinned;
            const data = await $fetch('/api/logs',{
                method:'PUT',
                body:{
                    logbookId:route.query.logbook,
                    logId:logId,
                    pinned: isPinned,
                    edit: false,
                }
            });
            if(data?.success){
                await updateLogs();
                return;
            }            
        } catch (error) {
            console.error(error);
        }
    };
    async function onEditLog(logId,Message) {
        try {
            const data = await $fetch('/api/logs', {
                method: 'PUT',
                body: {
                    logbookId:route.query.logbook,
                    logId:logId,
                    logMessage: Message,
                    edit: true,
                }
            });
            if(data?.success){
                await updateLogs();
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };
</script>