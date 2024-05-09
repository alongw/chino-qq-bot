<script setup lang="ts">
import CardComponent from '@/components/Card.vue'

defineOptions({
    name: 'BindPage'
})
</script>

<template>
    <card-component>
        <h2>QQ 账号绑定</h2>

        <div>向机器人发送以下命令来绑定账号（需要艾特机器人）</div>
        <div class="command">/bind 1145141919810</div>
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
