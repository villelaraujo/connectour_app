<template>
    <section :id = "props.id" class="flex flex-col items-center z-10">
        <div class="flex flex-col flex-1 max-w-300 w-[90vw] sm:w-[85vw] md:w-[80vw] lg:w-[70vw] p-4 sm:p-8 border-b border-l border-r border-emerald-500 bg-neutral-950 shadow-lg hover:shadow-emerald-700 text-white transition-shadow duration-500">
            <slot></slot>
        </div>
    </section>
</template>

<script setup>
    const props = defineProps({
        id:{type:String, required:true}
    });
</script>