<template>
    <SectionWrapper id="login">
        <LoginForm/>
    </SectionWrapper>
</template>

<script setup>
    definePageMeta({
        layout: 'pre-auth',
        middleware: 'autologin',
    });

    useHead({
        title: 'Login - Connectour',
    });
</script>