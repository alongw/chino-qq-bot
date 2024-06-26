import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Menu {
    lable: string
    key: string
    show: boolean
    icon?: string
    end_icon?: string
    selected_icon?: string
    disabled?: string
    loading?: string
    action?: Function
}

export const useMenuStore = defineStore(
    'menu',
    () => {
        const menuList = ref<Menu[]>([
            {
                lable: '登录',
                key: 'login',
                show: true,
                icon: 'login'
            },
            {
                lable: '绑定',
                key: 'bind',
                show: true,
                icon: 'link'
            },
            {
                lable: '账号',
                key: 'account',
                show: true,
                icon: 'account_circle'
            },
            {
                lable: '账单',
                key: 'bill',
                show: true,
                icon: 'attach_money'
            },
            {
                lable: 'MCSM',
                key: 'mcsm',
                show: true,
                icon: 'settings'
            }
        ])

        const activeMenuList = computed(() => {
            return menuList.value.filter((e) => {
                return e.show
            })
        })

        const switchShow = (key: string, value: boolean) => {
            const index = menuList.value.findIndex((e) => {
                return e.key === key
            })
            if (index === -1) {
                return
            }

            menuList.value[index].show = value
        }

        const switchAll = (value: boolean) => {
            menuList.value.forEach((e) => {
                e.show = value
            })
        }

        return {
            menuList,
            switchShow,
            activeMenuList,
            switchAll
        }
    },
    {
        persist: true
    }
)

import('@/utils/menu')
