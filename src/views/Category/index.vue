<script setup>
import { getCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getBannerAPI } from '@/apis/home'
import { onBeforeRouteUpdate } from 'vue-router'
import GoodsItem from '../Home/components/GoodsItem.vue'

// 1-获取导航栏
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
  console.log('路由变化了')
  getCategory(to.params.id)
})

// 2-获取banner
const bannerList = ref([])
const getBanner = async () => {
  const res = await getBannerAPI({
    distributionSite: '2'
  })
  bannerList.value = res.result
  // console.log(res.result)
}

onMounted(() => getBanner())
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: ' /' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src=item.imgUrl alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
.home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 500px;
    }
  }
</style>