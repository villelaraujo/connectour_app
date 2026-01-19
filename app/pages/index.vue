<template> 
    <SectionWrapper id="home">
        <div class="flex flex-col gap-3 w-full">
            <div class="flex items-center justify-between border p-2 sm:p-4 border-neutral-700">
                <h2 class="text-md md:text-xl font-semibold pl-2 sm:pl-4">Welcome to Connectour</h2>
                <div class="cursor-pointer py-2 px-4 bg-neutral-800 border border-neutral-700 shadow-md text-sm sm:text-lg transition-colors duration-150 hover:border-emerald-600"><span>Create Log</span></div>
            </div>
            <div class="flex flex-col gap-3 md:flex-row">
                <SideMenu/>
                <div class="flex-2 flex flex-col gap-4">
                    <LocationCardBig/>
                    <LocationCardBig/>
                    <LocationCardBig/>
                    <LocationCardBig/>
                    <LocationCardBig/>
                </div>
            </div>
        </div>
    </SectionWrapper>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth'],
    });
</script>