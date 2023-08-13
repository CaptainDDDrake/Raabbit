import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// 引入初始化样式文件
import '@/styles/common.scss'

// 测试接口函数
import { getCategoryAPI } from './apis/testAPI'
getCategoryAPI().then(res => {
  console.log(res)
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
