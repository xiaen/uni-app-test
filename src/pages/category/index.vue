<template>
  <view>
    <!-- 搜索 -->
    <search />
    <!-- 分类 -->
    <view class="category">



      <!-- 一级分类 active -->
      <!-- 点击的时候：知道自己点击的是哪个？ -->
      <view class="sup">
        <scroll-view scroll-y>
          <text 
          v-for="(item, index) in list" 
          :key="item.cat_id"
          :class="{active: index === ac_index}"
          @click="change(index)">{{item.cat_name}}</text>
        </scroll-view>
      </view>


      <!-- 二级分类 -->
      <view class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image src="http://static.botue.com/ugo/uploads/category.png" class="thumb"></image>
          
          <!-- 循环遍历某个数据？？？ 默认list[0]下的数据-->
          <view class="children" v-for="item in list[ac_index].children" :key="item.cat_id">
            <view class="title">{{item.cat_name}}</view>
            
            <!-- 三级分类 -->
            <view class="brands">

              <navigator url="/pages/list/index" v-for="one in item.children" :key="one.cat_id">
                <image :src="one.cat_icon"></image>
                <text>{{one.cat_name}}</text>
              </navigator>

            </view>



          </view>



        </scroll-view>
      </view>



    </view>
  </view>
</template>

<script>
  import search from '@/components/search';

  export default {
    data:function () { 
      return {
        list:[],
        // 初始化的下标：
        ac_index:0,
      }
    },
    components: {
      search
    },
    // 
    methods:{
      async getList() {
        const res =  await this.request({
          url:"/api/public/v1/categories"
        });
        this.list = res
      },
      change(index) {
        this.ac_index = index
      },
      // // 获取全部数据
      // async getList(){
      //   // this 是 Vue一个实例化
      //   // 
      //   const res =  await this.request({
      //     url:"/api/public/v1/categories"
      //   });

      //   this.list = res;
      // },
      // // 点击的时候
      // change(index){
      //   // 拿到下标有啥用？
      //   // 默认展示2 3级数据 list[0]
      //   this.ac_index = index;
      // }
    },
    // 进入页面的时候请求
    onLoad(){
      this.getList();
    }
  }
</script>

<style scoped lang="less">
  scroll-view {
    height: 100%;
  }

  .category {
    display: flex;
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      text {
        display: block;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 27rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }
        
        &.active {
          background-color: #FFF;
          color: #ea4451;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            transform: translateY(-50%);
            background-color: #ea4451;

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx 18rpx;

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;
        color: #333;

        .title {
          display: inline-block;
          margin: 40rpx 0 20rpx;
          font-size: 30rpx;

          &::before {
            content: '/';
            margin-right: 20rpx;
            color: #666;
          }

          &::after {
            content: '/';
            margin-left: 20rpx;
            color: #666;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        text {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
</style>
