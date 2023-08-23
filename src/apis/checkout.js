import requset from '@/utils/http'

// 获取详情接口
export const getCheckInfoAPI = () => {
  return requset({
    url: '/member/order/pre'
  })
}