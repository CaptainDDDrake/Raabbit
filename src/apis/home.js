// import { httpInstance } from '@/utils/http'
import httpInstance from "@/utils/http"


// 获取banner
export function getBannerAPI() {
  return httpInstance({
    url: '/home/banner'
  })
}