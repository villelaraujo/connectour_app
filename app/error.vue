<template>
    <NuxtLayout name="pre-auth">
        <SectionWrapper id="error">
        <div class="flex items-center justify-center w-full overflow-hidden h-screen">
            <div class="flex flex-col gap-6 items-center">
                <h1 class="text-3xl">An Error Occurred</h1>
                <button @click="handleError" class="cursor-pointer text-sm text-emerald-400 transition-colors duration-150 hover:text-white">Back to Home</button>
            </div>
        </div>
        </SectionWrapper>
    </NuxtLayout>
</template>

<script setup>
    useHead({
        title: 'Error'
    })

    function handleError(){
        clearError({redirect: '/'});
    }
</script>