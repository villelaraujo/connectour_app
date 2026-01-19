<template>
    <div>
        <NuxtLink class="text-sm text-emerald-400 transition-colors duration-150 hover:text-white" :to="props.to">{{ props.label }}</NuxtLink>
    </div>
</template>

<script setup>
    const props = defineProps({
        to: {type:String, required:true},
        label: {type:String,required:true}
    });
</script>