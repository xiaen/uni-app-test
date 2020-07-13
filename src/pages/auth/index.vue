<template>
  <view>
    <button type="primary" open-type="getUserInfo" @getuserinfo="getinfo">微信登录</button>
  </view>
</template>

<script>
  export default {
    methods: {
      async getUserInfo() {
        const [err, res] = await uni.getUserInfo()
        console.log(res);
        if(!res) {
          return;
        }
        this.getToken(res)
      },
      getToken (res) {
        // 发请求
        // 存token
        uni.setStorageSync('token', 123)
        uni.navigateBack()
      },
      getinfo(e) {
        console.log(e);
        this.getToken(e.details)
      }
    },
    onLoad() {
      this.getUserInfo()
    }
  }
</script>

<style lang="less" scoped>
  button {
    width: 600rpx;
    margin: 200rpx auto 0;
  }
</style>