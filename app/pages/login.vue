<template>
    <SectionWrapper id="login">
        <LoginForm/>
    </SectionWrapper>
</template>

<script setup>
    definePageMeta({
        layout: 'pre-auth',
    });

    useHead({
        title: 'Login - Connectour',
    });
</script>