<script setup lang="ts">
defineOptions({
    name: 'AppComponent'
})
</script>

<template>
    <mdui-top-app-bar style="position: relative">
        <mdui-button-icon icon="menu"></mdui-button-icon>
        <mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
        <div style="flex-grow: 1"></div>
        <mdui-button-icon icon="more_vert"></mdui-button-icon>
    </mdui-top-app-bar>
</template>
