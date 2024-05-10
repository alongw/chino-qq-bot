<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/index'
import CardComponent from '@/components/Card.vue'
import { useLogin } from '@/hooks/useLogin'
import { onMounted } from 'vue'

import { emit } from '@/event/index'

defineOptions({
    name: 'LoginPage'
})

const appid = import.meta.env.VITE_NYA_APPID
const route = useRoute()

const userStore = useUserStore()

const { type, getState, login } = useLogin(
    route?.query?.code?.toString(),
    route?.query?.state?.toString()
)

onMounted(async () => {
    if (type.value === 'state') {
        const state = await getState()
        if (state) {
            window.location.href = `https://account.lolinya.net/authorize?client_id=${appid}&state=${state}`
        }
    }
    if (type.value === 'verify') {
        const result = await login()
        if (result) {
            userStore.setToken(result)
            emit('USER:LOGIN')
        }
    }
})
</script>

<template>
    <card-component>
        <div v-if="type === 'deny'" class="deny">
            <h2>出错了</h2>
            <p>你拒绝了授权</p>
            <mdui-button style="margin-top: 20px" @click="$router.push('/')">
                返回首页
            </mdui-button>
        </div>
        <div v-else>
            <h2>请稍后</h2>
            <p v-if="type === 'state'">正在准备登录</p>
            <p v-else>正在效验登录</p>
            <mdui-linear-progress></mdui-linear-progress>
        </div>
    </card-component>
</template>

<style scoped lang="less">
p {
    margin: 5px 0;
}
</style>
