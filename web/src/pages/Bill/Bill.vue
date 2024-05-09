<script setup lang="ts">
import CardComponent from '@/components/Card.vue'

defineOptions({
    name: 'BillPage'
})
</script>

<template>
    <card-component>
        <h2>账单</h2>
        <div class="bill">
            <mdui-list>
                <mdui-list-subheader>您最近的积分变更记录</mdui-list-subheader>
                <mdui-list-item description="使用 /chick-in 命令进行签到 | 114 → 514">
                    <div class="title">
                        <p>每日签到积分奖励</p>
                        <p>2022-02-02 22:22</p>
                    </div>

                    <mdui-chip slot="end-icon">-514</mdui-chip>
                </mdui-list-item>
                <mdui-list-item description="使用 /chick-in 命令进行签到 | 114 → 514">
                    <div class="title">
                        <p>每日签到积分奖励</p>
                        <p>2022-02-02 22:22</p>
                    </div>

                    <mdui-chip slot="end-icon">+114</mdui-chip>
                </mdui-list-item>
                <mdui-list-item description="使用 /chick-in 命令进行签到 | 114 → 514">
                    <div class="title">
                        <p>每日签到积分奖励</p>
                        <p>2022-02-02 22:22</p>
                    </div>

                    <mdui-chip slot="end-icon">+1919</mdui-chip>
                </mdui-list-item>
                <mdui-button>加载更多</mdui-button>
            </mdui-list>
        </div>
    </card-component>
</template>

<style scoped lang="less">
.title {
    p {
        display: inline;

        &:nth-child(2) {
            margin-left: 10px;
            color: #747474;
            font-size: 15px;
        }
    }
}
</style>
