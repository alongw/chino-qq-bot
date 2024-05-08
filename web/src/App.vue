<script setup lang="ts">
import NavConponent from '@/components/Nav.vue'

defineOptions({
    name: 'AppComponent'
})
</script>

<template>
    <NavConponent></NavConponent>
    <router-view />
</template>
