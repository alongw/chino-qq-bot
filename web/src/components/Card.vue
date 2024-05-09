<script setup lang="ts">
defineOptions({
    name: 'CardComponent'
})
</script>

<template>
    <div class="card-component">
        <mdui-card class="card">
            <slot />
        </mdui-card>
    </div>
</template>

<style scoped lang="less">
.card-component {
    margin: 0 auto;
    padding: 15px;
    width: 100%;
    max-width: 1000px;

    .card {
        width: 100%;
        padding: 15px;
    }
}
</style>
