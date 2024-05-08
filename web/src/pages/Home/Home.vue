<script setup lang="ts">
defineOptions({
    name: 'HomePage'
})
</script>

<template>
    <div class="home">
        <mdui-card class="card">
            <div class="icon">
                <img src="@/assets/icon/500x.png" alt="chino-qq-bot-icon" />
            </div>
            <div class="desc">
                <br />
                <p>
                    这是一个基于 QQ 官方机器人 API
                    的趣味性及功能性机器人，由于并没有想到什么好名字，就暂时先使用这个名字。点击上方胶囊菜单切换功能。
                </p>
                <br />
                <hr />
                <br />
            </div>
            <div class="info">
                <ul>
                    <li>
                        官方文档：<a
                            href="https://docs.liyxi.com/qq-bot/"
                            target="_blank"
                        >
                            https://docs.liyxi.com/qq-bot/
                        </a>
                    </li>

                    <li>
                        命令列表：<a
                            href="https://docs.liyxi.com/qq-bot/command/"
                            target="_blank"
                        >
                            https://docs.liyxi.com/qq-bot/command/
                        </a>
                    </li>

                    <li>
                        联系我们：<a href="https://contact.alongw.cn/" target="_blank">
                            https://contact.alongw.cn/
                        </a>
                    </li>
                </ul>
            </div>
        </mdui-card>
    </div>
</template>

<style scoped lang="less">
.home {
    margin: 0 auto;
    padding: 15px;
    width: 100%;
    max-width: 1000px;

    .card {
        width: 100%;
        padding: 15px;

        .icon {
            max-width: 200px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .info {
            margin-left: 25px;

            li {
                margin: 8px;
            }
        }
    }
}
</style>
