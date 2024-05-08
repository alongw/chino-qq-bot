import '@/assets/style/base.less'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'material-icons/iconfont/material-icons.css'

import 'mdui/mdui.css'
import 'mdui'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
