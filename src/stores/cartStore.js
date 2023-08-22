// 封装购物车模块

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // 1. 定义state - cartList
  const cartList = ref([])
  
  // cartList 中的数据
  // id: goods.value.id, 
  // name: goods.value.name,
  // picture: goods.value.mainPictures[0], 
  // price: goods.value.price, 
  // count: count.value, // 商品数量
  // skuId: skuObj.skuId, // 这里的I老是容易写错
  // attrsText: skuObj.specsText, 
  // selected: true  // 商品是否选中

  // 2. 定义action - addCart
  const addCart = (goods) => {
    // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      // 找到了
      item.count++
    } else {
      // 没找到
      cartList.value.push(goods)
    }
  }
  // 删除购物车
  const delCart = (skuId) => {
    // 1-采用 Splice 实现
    // const index = cartList.value.findIndex((item) => skuId === item.skuId)
    // cartList.value.splice(index, 1)
    // 2-采用 filter 实现
    cartList.value = cartList.value.filter(item => item.skuId !== skuId)
  }

  // 单选功能
  const singleCheck = (skuId, selected) => {
    // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的 selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选状态
  const allCheck = (selected) => {
    // 把cartList中的每一项的selected都设置为当前的全选框状态
    cartList.value.forEach(item => item.selected = selected)
  }

  // 计算属性
  // 1. 总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2. 总价 所有项的 count  * price 之和
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0)) 
  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  //3. 已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))

  //4. 已选择商品价钱合集
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))


  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    allCheck,
    addCart,
    delCart,
    singleCheck,
    selectedCount,
    selectedPrice
  }
}, {
  persist: true,
})