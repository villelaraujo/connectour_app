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

    const token = useCookie('auth_token');
    if(token.value){
        try {
            const response = await $fetch('/api/auth/autologin',{method:'POST'});
            if(response?.logged) navigateTo('/');
        } catch (error) {
            
        }
    }
</script>