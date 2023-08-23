// 管理用户数据相关
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  // 1. 定义管理用户数据的 state
  const userInfo = ref({})
  // 2. 定义获取接口数据的 action 函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    // 根据现有的数组经过一定的映射，得到一个全新的数组
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
  }

  // 退出时用户数据清除函数
  const clearUserInfo = () => {
    userInfo.value = {}
    // 执行清除购物车的 action
    cartStore.clearCart()
  }

  // 3. 以对象的格式把 state 和 action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true,
})

