// 封装分类数据业务相关的业务代码
import { getCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const categoryData = ref({}) // 查看接口文档，发现返回是一个对象
  const route = useRoute()  // 通过useRoute获取id
  const getCategory = async (id = route.params.id) => {
    // 这里需要获取路由参数，通过useRoute来获取
    const res =  await getCategoryAPI(id) // 这里获取id与前面定义route是相关的，那边采取的是params传参，那么这边就采取params方式
    categoryData.value = res.result
  }
  onMounted(() => getCategory())

  // 目标：路由参数变化的时候，可以把分类数据接口重新发送
  // 这里的to指的是目标路由
  onBeforeRouteUpdate((to) => {
    // console.log('路由变化了')
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}