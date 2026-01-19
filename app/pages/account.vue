<template>
    <SectionWrapper id="register">
        <CreateAccForm/>
    </SectionWrapper>
</template>

<script setup>
    definePageMeta({
        layout: 'pre-auth',
    });

    useHead({
        title: 'Create Account - Connectour',
    });
</script>