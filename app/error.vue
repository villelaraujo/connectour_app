<template>
    <SectionWrapper id="error">
        <div class="w-screen overflow-hidden h-screen">
            <div class="flex items-center justify-center">
                <h1 class="text-5xl">An Error Occurred</h1>
                <button @click="handleError" class="text-sm text-emerald-400 transition-colors duration-150 hover:text-white"></button>
            </div>
        </div>
    </SectionWrapper>
</template>

<script setup>
    definePageMeta({
        layout: 'pre-auth',
    })
    useHead({
        title: 'Error'
    })

    function handleError(){
        clearError({redirect: '/login'});
    }
</script>