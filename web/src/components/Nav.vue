<script setup lang="ts">
import { useMenuStore } from '@/store/menu'

defineOptions({
    name: 'NavComponent'
})

const menuStore = useMenuStore()
</script>

<template>
    <div class="nav">
        <h1>Chino-QQ-Bot 管理面板</h1>
        <div class="menu">
            <mdui-segmented-button-group>
                <mdui-segmented-button
                    v-for="item in menuStore.activeMenuList"
                    :key="item.key"
                    :value="item.key"
                    :icon="item.icon"
                >
                    {{ item.lable }}
                </mdui-segmented-button>
            </mdui-segmented-button-group>
        </div>
    </div>
</template>

<style scoped lang="less">
.nav {
    margin: 25px auto;

    h1 {
        margin: 15px auto;
        text-align: center;
        font-weight: 400;
        font-size: 30px;
        color: transparent;
        background-image: linear-gradient(
            90deg,
            #22a5b9,
            #5598de 20%,
            #7f87ff 45%,
            #4784c0 70%,
            #0c6ac9
        );
        background-clip: text;
        -webkit-background-clip: text;
    }

    .menu {
        margin-left: 15px;
    }
}
</style>
