<script setup lang="ts">
import CardComponent from '@/components/Card.vue'
import { ref } from 'vue'
import { getBindCode } from '@/apis/bind'

defineOptions({
    name: 'BindPage'
})

const bindCode = ref('')

const handleGetBindCode = async () => {
    bindCode.value = '正在获取...'
    const { data: result } = await getBindCode()
    if (result.status !== 200) {
        return (bindCode.value = '获取失败，请重试')
    }
    bindCode.value = `/bind ${result.data.code}`
}
</script>

<template>
    <card-component>
        <h2>QQ 账号绑定</h2>

        <div>向机器人发送以下命令来绑定账号（需要艾特机器人）</div>
        <div class="command">
            <p v-if="bindCode">{{ bindCode }}</p>
            <mdui-button @click="handleGetBindCode" v-else>获取</mdui-button>
        </div>
        <div>绑定命令具有唯一性，在绑定成功前，请不要公开。否则可能会威胁账号安全。</div>
    </card-component>
</template>

<style scoped lang="less">
.command {
    margin: 15px 0;
    padding: 25px;
    background-color: #f5f5f5;
    border: 1px solid #00000066;
    border-radius: 10px;
}
</style>
