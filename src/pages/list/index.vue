<template>
  <view>
    <!-- 筛选 -->
    <view class="filter">
      <text class="active">综合</text>
      <text>销量</text>
      <text>价格</text>
    </view>
    <!-- 商品列表 -->
    <scroll-view class="goods" scroll-y @scrolltolower="scrolltolower">
      <view class="item" @click="goDetail(item.goods_id)" v-for="item in list" :key="item.goods_id">
        <!-- 商品图片 -->
        <image class="pic" :src="item.goods_small_logo"></image>
        <!-- 商品信息 -->
        <view class="meta">
          <view class="name">{{item.goods_name}}</view>
          <view class="price">
            <text>￥</text>{{item.gooods_price}}<text>.00</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data(){
      return {
        list: [],
        query: '',
        pagenum: 1,
        pagesize: 5,
        flag: true,
        arr: [],
        f: true,
      }
    },
    methods: {
      goDetail (data) {
        // uni.navigateTo({
        //   url: '/pages/goods/index?query='+data
        // })
        uni.navigateTo({
          url: '/pages/goods/index?id='+data
        })
      },
      async getList() {
        console.log(this.pagenum);
        
        this.arr = await this.request({
          url: '/api/public/v1/goods/search',
          data: {
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        })
        this.list = this.list.concat(this.arr.goods)
        this.arr.goods.length > 0 ? this.f = true: this.f = false
        console.log(this.f);
        
      },
      async scrolltolower() {
        if(this.flag && this.f){
          this.flag = false
          this.pagenum++
          await this.getList()
          this.flag = true
        }
      }
    },
    onLoad(e) {
      this.query = e.query
      this.getList()
    }
  }
</script>

<style scoped lang="less">
  .filter {
    display: flex;
    height: 96rpx;
    line-height: 96rpx;
    border-bottom: 1rpx solid #ddd;

    /* #ifdef H5 */
    position: relative;
    z-index: 99;
    /* #endif */

    text {
      flex: 1;
      text-align: center;
      font-size: 30rpx;
      color: #333;

      &.active {
        color: #ea4451;
      }
    }
  }
  
  .goods {
    position: absolute;
    width: 100%;
    top: 97rpx;
    bottom: 0;
  }

  .item {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 20rpx;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .pic {
      width: 200rpx;
      height: 200rpx;
      margin-right: 30rpx;
    }

    .meta {
      flex: 1;
      font-size: 27rpx;
      color: #333;
      position: relative;
    }

    .name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      position: absolute;
      bottom: 0;

      color: #ea4451;
      font-size: 33rpx;

      text {
        font-size: 22rpx;
      }
    }
  }
</style>
