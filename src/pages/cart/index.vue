<template>
  <view class="wrapper">
    <!-- 收货信息 -->
    <view class="shipment" v-if="addr">
      <view class="dt">收货人: </view>
      <view class="dd meta">
        <text class="name">{{addr.userName}}</text>
        <text class="phone">{{addr.telNumber}}</text>
      </view>
      <view class="dt">收货地址:</view>
      <view class="dd">{{addr.details}}</view>
    </view>
    <view>
      <button else @tap="getAddr">添加收货地址<button>
    </view>
    <!-- 购物车 -->
    <view class="carts">
      <view class="item">
        <!-- 店铺名称 -->
        <view class="shopname">优购生活馆</view>
        <view class="goods" v-for="(item, index) in data" :key="item.id">
          <!-- 商品图片 -->
          <image class="pic" :src="item.src"></image>
          <!-- 商品信息 -->
          <view class="meta">
            <view class="name">{{item.name}}</view>
            <view class="price">
              <text>￥</text>{{item.price}}<text>.00</text>
            </view>
            <!-- 加减 -->
            <view class="amount">
              <text class="reduce" @tap="numChange(-1, index)">-</text>
              <input type="number" :value="item.numb" class="number">
              <text class="plus" @tap="numChange(1, index)">+</text>
            </view>
          </view>
          <!-- 选框 -->
          <view class="checkbox">
            <icon type="success" size="20" :color="item.checked ? '#ea4451' : '#ccc'" @tap="checkChange(item.checked, index)"></icon>
          </view>
        </view>
      </view>
    </view>
    <!-- 其它 -->
    <view class="extra">
      <label class="checkall">
        <icon type="success" :color="is ? '#ea4451' : '#ccc'" size="20" @tap="changeAll(is)"></icon>
        全选
      </label>
      <view class="total">
        合计: <text>￥</text><label>{{allPrice}}</label><text>.00</text>
      </view>
      <view class="pay" @tap="account">结算({{allNum}})</view>
    </view>
  </view>
</template>

<script>
  export default {
    data(){
      return {
        data: uni.getStorageSync('cart') || [],
        allPrice: 0,
        allNum: 0,
        addr: null
      }
    },
    computed: {
      is(){
        var arr = []
        this.data.forEach(item => {
          if(item.checked) {
            arr.push(item)
          }
        });
        return this.data.length === arr.length
      },
    },
    methods: {
      account() {
        if(!this.addr) {
          uni.showToast({
            title: '请填写收货地址'
          })
          return;
        }
        var flag = false
        this.data.forEach(item => {
            if(item.checked) {
            flag = true
          }
        })
        if(!flag) {
          uni.showToast({
            title: '请选择商品'
          })
          return;
        }
        const token =  uni.getStorageSync('token')
        if (!token) {
          uni.showToast({
            title: '请登录'
          })
          // 让用户去登录一个 非tabBar页面；
          uni.navigateTo({
            url:"/pages/auth/index"
          });
          return;
        }
      },
      async getAddr() {
      const [err, res] = await uni.chooseAddress()
      console.log(res);
      this.addr = res;
      // 详细地址
      this.addr.details = res.provinceName+res.cityName+res.countyName+res.detailInfo;
      },
      changeAll(val) {
        // this.is = !val
        this.data.forEach(item => {
            item.checked = !val
        });
        uni.setStorageSync('cart', this.data);
        this.allPrice = 0
        this.allNum = 0
        if(!val) {
          this.data.forEach(item => {
            this.allPrice += item.price
            this.allNum++
          })
        }
      },
      checkChange(val, i) {
        this.data[i].checked = !this.data[i].checked;
        uni.setStorageSync('cart', this.data);
        this.allPrice = 0
        this.allNum = 0
        this.data.forEach(item => {
          if(item.checked) {
          this.allPrice += item.price
          this.allNum++
          }
        })
      },
      numChange(val, i) {
        if (this.data[i].numb + val < 1 || this.data[i].numb + val > 15) {
          return;
        }
        this.data[i].numb = this.data[i].numb + val;
        this.data[i].price = this.data[i].oneprice * this.data[i].numb
        uni.setStorageSync('cart', this.data)
        this.allPrice = 0
        this.data.forEach(item => {
          if(item.checked) {
          this.allPrice += item.price
          }
        })
      }
    },
    onLoad() {
      // uni.getStorageSync('cart') || []
      // const [err, res] = uni.chooseAddress()
      // console.log(res);
      // this.addr = res
    },
    onShow() {
      this.data = uni.getStorageSync('cart') || [];
      this.allPrice = 0
      this.allNum = 0
      this.data.forEach(item => {
        if(item.checked) {
          this.allPrice += item.price
          this.allNum++;
        }
      })
    }
  }
</script>

<style scoped lang="less">
  .shipment {
    height: 100rpx;
    line-height: 2;
    padding: 30rpx 30rpx 40rpx 30rpx;
    font-size: 27rpx;
    color: #333;
    background-color: #fff;
    background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;

    .dt {
      width: 140rpx;
      float: left;
      clear: both;
    }

    .dd {
      padding-left: 160rpx;
    }

    .meta {
      padding-right: 50rpx;
    }

    text.phone {
      float: right;
    }
  }

  .carts {
    background-color: #f4f4f4;
    padding-bottom: 110rpx;
    overflow: hidden;

    .shopname {
      padding: 30rpx;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #333;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
    }

    .goods {
      display: flex;
      padding: 30rpx 20rpx 30rpx 0;
      margin-left: 100rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
  
      position: relative;

      .checkbox {
        width: 101rpx;
        height: 100%;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: -100rpx;
        top: 0;
      }

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

      .amount {
        position: absolute;
        bottom: 0;
        right: 20rpx;

        height: 48rpx;
        text-align: center;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;

        display: flex;
        align-items: center;

        text {
          display: block;
          width: 60rpx;
          line-height: 48rpx;
          font-size: 36rpx;
          color: #ddd;
          text-align: center;
        }

        input {
          width: 60rpx;
          height: 48rpx;
          min-height: 48rpx;
          font-size: 27rpx;
          border-left: 1rpx solid #ddd;
          border-right: 1rpx solid #ddd;
        }
      }
    }
  }

  .extra {
    position: fixed;
    bottom: 0;
    /* #ifdef H5 */
    bottom: 50px;
    /* #endif */
    left: 0;
    z-index: 9;

    width: 750rpx;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 36rpx;
    border-top: 1rpx solid #eee;
    background-color: #fff;
    color: #333;
    display: flex;

    .checkall {
      width: 140rpx;
      line-height: 1;
      margin-left: 25rpx;
      display: flex;
      align-items: center;

      icon {
        margin-right: 20rpx;
      }
    }

    .total {
      display: flex;
      justify-content: center;
      flex: 1;

      label, text {
        color: #ea4451;
        vertical-align: bottom;
        position: relative;
        bottom: -2rpx;
      }

      text {
        position: relative;
        bottom: -3rpx;
        font-size: 24rpx;

        &:first-child {
          margin-left: 10rpx;
        }
      }
    }

    .pay {
      width: 200rpx;
      background-color: #ea4451;
      color: #fff;
    }
  }
</style>

