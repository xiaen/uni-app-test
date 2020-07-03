<template>
  <view :style="{height: pageHeight, overflow: 'hidden'}">
    <search @search="disableScroll" />

    <!-- 焦点图 -->
    <swiper class="banner" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item v-for="item in swiperArr" :key="item.goods_id">
        <navigator :url="'/pages/goods/index?id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    
    <!-- 导航条 -->
    <view class="navs">

      <navigator open-type="switchTab" url="/pages/category/index" v-for="item in navArr" :key="item.name">
        <image :src="item.image_src"></image>
      </navigator>

    </view>


    <!-- 楼层 -->
    <view class="floors">

      <view class="floor" v-for="(one,index) in floorsArr" :key="index">

        <view class="title">
          <image :src="one.floor_title.image_src"></image>
        </view>

        <!-- 图片区 -->
        <view class="items">

          <navigator url="/pages/list/index" v-for="img in one.product_list" :key="img.name">
            <image :src="img.image_src"></image>
          </navigator>

        </view>


      </view>

    </view>


    <!-- 回到顶部 -->
    <view class="goTop icon-top" v-if="height>200" @click="goTop"></view>

  </view>
</template>

<script>
  import search from '@/components/search';

  export default {

    data () {
      return {
        pageHeight: 'auto',
        // 轮播图数据
        swiperArr:[],
        // 导航
        navArr:[],
        // 楼层
        floorsArr:[],

        // 初始化数据：隐藏；
        // isShow:false,
        height:0,
      }
    },

    components: {
      search
    },
    
    methods: {
      disableScroll (ev) {
        this.pageHeight = ev.pageHeight + 'px';
      },
      async getswiperArr(){
       this.swiperArr = await this.request({url:'/api/public/v1/home/swiperdata'})
      },
      async getnavArr(){
       this.navArr = await this.request({url:'/api/public/v1/home/catitems'})
      },
      async getfloorsArr(){
       this.floorsArr = await this.request({url:'/api/public/v1/home/floordata'})
      },
      // 返回顶部
      goTop(){
        // API
        uni.pageScrollTo({scrollTop:0});
      }
    },

    onLoad() {
      this.getswiperArr()
      this.getnavArr()
      this.getfloorsArr()
    },
    
    // 页面滚动的时候
    onPageScroll(e){
      // 1.滚动到哪个地方？如何获取？事件对象
      // console.log(e.scrollTop);
      // 2.用处？滚动了200px  控制按钮：隐藏
      // if (e.scrollTop>200) {
      //   this.isShow = true;
      // }
      // else {
      //   this.isShow = false;
      // }
      this.height = e.scrollTop;
    },

    async onPullDownRefresh() {
      await this.getswiperArr()
      await this.getnavArr()
      await this.getfloorsArr()
      uni.stopPullDownRefresh()
    }
  }
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    height: 340rpx;

    image {
      width: 100%;
      height: 340rpx;
    }
  }

  .navs {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 44rpx;

    image {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor {

    .title {
      width: 750rpx;
      height: 60rpx;
      padding: 20rpx 0 0 8rpx;
      background-color: #f4f4f4;
    }

    .items {
      padding: 20rpx 16rpx;
      overflow: hidden;

      navigator {
        width: 193rpx;
        height: 188rpx;
        margin-left: 10rpx;
        margin-bottom: 10rpx;
        float: left;
      }

      navigator:first-child {
        width: 232rpx;
        height: 386rpx;
        margin-left: 0rpx;
      }

      navigator:nth-child(2),
      navigator:nth-child(5) {
        width: 273rpx;
      }
    }

    &:first-child {

      .items {

        navigator {
          width: 233rpx;
        }
      }
    }
  }

  .goTop {
    position: fixed;
    bottom: 30rpx;
    /* #ifdef H5 */
    bottom: 65px;
    /* #endif */
    right: 30rpx;
  
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100rpx;
    height: 100rpx;
    font-size: 48rpx;
    color: #666;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
  }
</style>