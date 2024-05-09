<script setup lang="ts">
import CardComponent from '@/components/Card.vue'

defineOptions({
    name: 'AccountPage'
})
</script>

<template>
    <card-component>
        <h2>账号</h2>
        <div class="unbind">
            <p>你当前已经绑定 QQ ：1145141919810</p>
            <mdui-button>解除绑定</mdui-button>
        </div>
    </card-component>
</template>

<style scoped lang="less">
p {
    margin: 15px 0;
}
</style>
