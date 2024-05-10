import { on } from '@/event'

import { useMenuStore } from '@/store/menu'

const menuStore = useMenuStore()

on('USER:LOGIN', () => {
    menuStore.switchShow('login', false)
})
