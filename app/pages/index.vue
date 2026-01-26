<template> 
    <SectionWrapper id="home">
        <div class="flex flex-col gap-3 w-full">
            <div class="flex items-center justify-between border p-2 sm:p-4 border-neutral-700">
                <h2 class="text-md md:text-xl font-semibold pl-2 sm:pl-4">Welcome,<span class="pl-2 text-neutral-400">{{ username }}</span></h2>
                <div class="cursor-pointer flex items-center gap-2 py-2 px-4 bg-neutral-800 border border-neutral-700 shadow-md text-sm sm:text-lg transition-colors duration-150 hover:border-emerald-600 hover:bg-emerald-800">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                    <span>Create Log</span>
                </div>
            </div>
            <div class="flex flex-col gap-3 md:flex-row">
                <SideMenu/>
                <div class="flex-2 flex flex-col gap-4">
                    <LogCard log="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,"
                     city="New York" country="USA" date="12/02/25" :pinned="false" title="My time in New York"/>
                </div>
            </div>
        </div>
    </SectionWrapper>
</template>

<script setup>
    const username = ref('Guest');
    const providedId= ref(null);
    onMounted(async()=>{
        try {
            const response = await $fetch('/api/userdata');
            console.log(response);
            if(response){
                username.value = response.username;
                provide(response.id, providedId);
            }
            return;
        } catch (error) {
            console.error(error);
        }
    });
</script>