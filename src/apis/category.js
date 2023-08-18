import request from '@/utils/http' // 由于http为默认导出，所以这里可以命名为request

export const getCategoryAPI = (id) => {
  return request({
    url: '/category',
    params: {
      id
    }
  })
}