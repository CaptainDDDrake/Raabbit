import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { useIntersectionObserver } from '@vueuse/core'
 
// 引入初始化样式文件
import '@/styles/common.scss'

// 测试接口函数
// import { getCategoryAPI } from './apis/testAPI'
// getCategoryAPI().then(res => {
//   console.log(res)
// })

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

// 定义全局指令
app.directive('img-lazy', {
  mounted (el, binding) {
    // el: 指令绑定的那个元素 img
    // binding: binding.value 指令等于号后面绑定的表达式的值
    // console.log(el, binding.value)
    // 懒加载指令逻辑
    useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        if(isIntersecting) {
          // 进入视口区域
          el.src = binding.value
          // console.log(isIntersecting)
        }
      }
    )
  }
})