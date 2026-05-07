<template> 
    <SectionWrapper id="home">
        <div v-if="deleteMode" class="fixed top-0 left-0 z-50 h-screen w-screen flex items-center justify-center bg-transparent backdrop-blur-sm">
            <div class="flex flex-col gap-8 px-4 py-6 mx-6 max-w-125 border border-emerald-500 opacity-100 bg-neutral-950 shadow-lg hover:shadow-emerald-700 text-white transition-shadow duration-500">
                <div class="flex justify-center">
                    <h1 class="text-2xl">Account Termination</h1>
                </div>
                <div>
                    <p class="text-sm text-white">This action is irreversible, all your account data will be permanently <span class="text-red-500">deleted</span></p>
                </div>
                <div class="flex items-center justify-center gap-4">
                    <p>Confirm Password:</p>
                    <input v-model="password" class="peer px-4 py-2 text-white border border-neutral-500 focus:outline-none focus:border-emerald-500" type="password" required>
                </div>
                <div>
                    <div class="flex items-center justify-around">
                        <button @click="deleteMode=false" class="cursor-pointer flex gap-3 items-center justify-center py-2 px-6 border border-neutral-700 transition-colors duration-150 hover:border-emerald-500">Close</button>
                        <button class="cursor-pointer flex gap-3 items-center justify-center py-2 px-6 text-red-700 bg-red-950 border border-red-700 transition-all duration-150 hover:border-red-400 hover:text-red-400">DELETE</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-3 w-full">
            <div class="flex flex-col gap-6 items-center justify-center border px-2 py-12 sm:px-4 border-neutral-700">
                <div class="flex items-center justify-center h-36 w-36 mt-4 border border-neutral-700 bg-neutral-900 rounded-full">
                    <h1 class="text-5xl text-white">{{username.charAt(0).toUpperCase()}}</h1>
                </div>
                <div>
                    <h1 class="text-3xl text-neutral-400">{{ username }}</h1>
                </div>
                <div class="flex flex-col items-center gap-6 w-full pt-8">
                    <div class="flex gap-4 items-center w-full">
                        <h2 class="text-white">Active Email:</h2>
                        <div class="p-4 bg-neutral-800 flex-2">
                            <p class="text-neutral-400">{{ userEmail }}</p>
                        </div>
                    </div>
                    <div v-if="editNameMode" class="flex items-center w-full">
                        <h2 class="text-white mr-4">Display Name:</h2>
                        <input ref="inputField" v-model.trim="newName" type="text" class="p-4 bg-neutral-700 flex-2 text-neutral-400" :placeholder="username">
                        <button @click="updateUsername" class="group cursor-pointer flex items-center justify-center p-4 bg-neutral-700 transition-colors duration-150 hover:bg-neutral-600">
                            <svg class="transition-colors duration-150 group-hover:fill-emerald-600" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>                        
                        </button>
                        <button @click="toggleEditNameMode" class="group cursor-pointer flex items-center justify-center p-4 bg-neutral-700 transition-colors duration-150 hover:bg-neutral-600">
                            <svg class="transition-colors duration-150 group-hover:fill-red-600" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>                        
                        </button>
                    </div>
                    <div v-else class="flex items-center w-full">
                        <h2 class="text-white mr-4">Display Name:</h2>
                        <div class="p-4 bg-neutral-800 flex-2">
                            <p class="text-neutral-400">{{ username }}</p>
                        </div>
                        <button @click="toggleEditNameMode" class="group cursor-pointer flex items-center justify-center p-4 bg-neutral-700 transition-colors duration-150 hover:bg-neutral-600">
                            <svg class="transition-colors duration-150 group-hover:fill-emerald-500" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                        </button>
                    </div>
                    <div class="flex flex-col gap-4 items-center w-full">
                        <div class="flex gap-2 items-center">
                            <h2 class="cursor-pointer transition-colors duration-150 hover:text-emerald-500">Change account password</h2>
                            <div class="h-4 w-px bg-neutral-700"></div>
                            <button @click="deleteMode=true" class="cursor-pointer transition-colors duration-150 hover:text-red-800">Delete this Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SectionWrapper>
</template>

<script setup>
    const username = ref('Guest');
    const userEmail = ref('');
    const editNameMode = ref(false);
    const inputField = ref(null);
    const newName = ref('');
    const password = ref('');
    const deleteMode = ref(false);

    onMounted(async()=>{
        await fetchUserdata();
    });

    function toggleEditNameMode(){
        editNameMode.value = !editNameMode.value;
        if(editNameMode.value===true){
            nextTick(()=>{
                inputField.value.focus();
            })
        }
    };
    async function updateUsername(){
        try {
            const response = await $fetch('/api/update/username',{
                method:'PUT',
                body:{
                    newUsername:newName.value
                }
            });
            if(response?.message==='success'){
                await fetchUserdata();
                editNameMode.value = false;
                newName.value = '';
                return;
            }            
        } catch (error) {
            console.error(error);
        }
    }
    async function fetchUserdata() {
        try {
            const response = await $fetch('/api/userdata');
            if(response){
                username.value = response.username;
                userEmail.value = response.email;
            }
            await updateLogs();
            return;
        } catch (error) {
            console.error(error);
        }
    };
    async function deleteAccount(){
        if(!password.value) return;
        try {
            response = await $fetch('',{method:'DELETE', body:{password:password.value}});
        } catch (error) {
            
        }
    }
</script>