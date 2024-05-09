<script setup lang="ts">
import CardComponent from '@/components/Card.vue'
import { useLogin } from '@/hooks/useLogin'

defineOptions({
    name: 'LoginPage'
})

const { type } = useLogin()
</script>

<template>
    <card-component>
        <h2>请稍后</h2>
        <p v-if="type === 'state'">正在准备登录</p>
        <p v-else>正在效验登录</p>
        <mdui-linear-progress></mdui-linear-progress>
    </card-component>
</template>

<style scoped lang="less">
p {
    margin: 5px 0;
}
</style>
