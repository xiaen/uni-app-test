<template>
  <view class="searchcontent">
    <view class="search" :class="{focus:focus}">
      <input @focus="focuss" :placeholder="placeholder"/>
      <view class="icon">{{sou}}</view>
      <button v-if="focus" @click="quxiao">取消</button>
    </view>

    <view v-if="focus" class="history"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      focus: false,
      placeholder: '',
      sou: '搜索'
    };
  },
  onLoad() {},
  methods: {
    focuss() {
      this.focus = true;
      var res = uni.getSystemInfoSync().windowHeight
      this.$emit('send', res + 'px')
      this.placeholder = '请输入'
      this.sou = ''
    },
    quxiao() {
      this.focus = false;
      this.$emit('send', 'auto')
      this.placeholder = ''
      this.sou = '搜索'
    }
  }
};
</script>

<style lang="less">
.searchcontent {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  .search {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100rpx;
    background-color: red;
    padding: 20rpx 16rpx;
    input {
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 10rpx;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: url(../../static/images/icon_search@2x.png) no-repeat;
      background-size: 40rpx;
      padding-left: 50rpx;
      font-size: 30rpx;
    }
  }
  .focus {
    display: flex;
    input {
      padding-left: 60rpx;
      flex: 1;
    }
    .icon {
      position: absolute;
      left: 80rpx;
      top: 50%;
    }
    button {
      width: 200rpx;
      height: 60rpx;
      padding: 0;
      text-align: center;
      font-size: 28rpx;
    }
  }
  .history {
    position: absolute;
    top: 100rpx;
    right: 0;
    bottom: 0;
    left: 0;
    background: #666;
    width: 100%;
  }
}
</style>
