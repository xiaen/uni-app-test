<template>
  <view class="content" :style="{height: height, overflow: hidden}">
    <search @send="send"/>
	<view class="swiper">
		<swiper>
			<swiper-item>
				<navigator url="">
					<image src="../../static/uploads/banner1.png"></image>
				<navigator>
			</swiper-item>
			<swiper-item>
				<navigator url="">
					<image src="../../static/uploads/banner2.png"></image>
				<navigator>
			</swiper-item>
			<swiper-item>
				<navigator url="">
					<image src="../../static/uploads/banner3.png"></image>
				<navigator>
			</swiper-item>
		</swiper>
	</view>
	<view class="nav">
		<view class="item">
		<navigator url="">
			<image src="../../static/uploads/icon_index_nav_1@2x.png"></image>
		</navigator>
		</view>
		<view class="item">
		<navigator url="">
			<image src="../../static/uploads/icon_index_nav_2@2x.png"></image>
		</navigator>
		</view>
		<view class="item">
		<navigator url="">
			<image src="../../static/uploads/icon_index_nav_3@2x.png"></image>
		</navigator>
		</view>
		<view class="item">
		<navigator url="">
			<image src="../../static/uploads/icon_index_nav_4@2x.png"></image>
		</navigator>
		</view>
	</view>
	<view class="floor">
		<view class="item">
			<view class="header">
				<navigator url="">
					<image src="../../static/uploads/pic_floor01_title.png"></image>
				</navigator>
			</view>
			<view class="neirong">
			<navigator url="">
				<image src="../../static/uploads/pic_floor01_1@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor01_2@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor01_3@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor01_4@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor01_5@2x.png"></image>
			</navigator>
			</view>
		</view>
		<view class="item">
			<view class="header">
				<navigator url="">
					<image src="../../static/uploads/pic_floor02_title.png"></image>
				</navigator>
			</view>
			<view class="neirong">
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_1@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_2@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_3@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_4@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_5@2x.png"></image>
			</navigator>
			</view>
		</view>
				<view class="item">
			<view class="header">
				<navigator url="">
					<image src="../../static/uploads/pic_floor02_title.png"></image>
				</navigator>
			</view>
			<view class="neirong">
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_1@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_2@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_3@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_4@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_5@2x.png"></image>
			</navigator>
			</view>
		</view>
				<view class="item">
			<view class="header">
				<navigator url="">
					<image src="../../static/uploads/pic_floor02_title.png"></image>
				</navigator>
			</view>
			<view class="neirong">
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_1@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_2@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_3@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_4@2x.png"></image>
			</navigator>
			<navigator url="">
				<image src="../../static/uploads/pic_floor02_5@2x.png"></image>
			</navigator>
			</view>
		</view>
	</view>
  </view>
</template>

<script>
import search from "../../compontents/search/search"
export default {
	components: {search},
  data() {
    return {
		height: 'auto',
		hidden: 'hidden'
	};
  },
  onLoad() {},
  methods: {
	  send(val) {
this.height = val
	  }
  }
};
</script>

<style lang="less">
.content {
  .swiper {
	  image {
		  width: 100%;
		  height: 340rpx;
	  }
  }
  .nav {
	  display: flex;
	  padding-top: 20rpx;
	  .item {
		  flex: 1;
		text-align: center;
		  image {
			width: 128rpx;
			  height: 128rpx;
		  }
	  }
  }
  .floor {
	  .item {
		  			  height: 368rpx;
			  .header {
				  width: 100%;
				  height: 60rpx;
				  image {
					  width: 100%;
					height: 60rpx;
				  }
			  }
			  .neirong {
				  navigator {
					  float: left;
					&:first-child{
						  width: 232rpx;
						  height: 368rpx;
					  }
					&:nth-child(2) {
						  width: 273rpx;
						  height: 183rpx;
					  }
					&:nth-child(4) {
						  width: 273rpx;
						  height: 183rpx;
					  }
					&:nth-child(3) {
						  width: 203rpx;
						  height: 183rpx;
					  }
					&:nth-child(5) {
						  width: 203rpx;
						  height: 183rpx;
					  }
					  image {
						  width: 100%;
						  height: 100%;
					  }
				  }
			  }
	  }
	  .item {
		  &:first-child {
			  height: 368rpx;
			  .header {
				  width: 100%;
				  height: 60rpx;
				  image {
					  width: 100%;
					height: 60rpx;
				  }
			  }
			  .neirong {
				  navigator {
					  float: left;
					  &:first-child{
						  width: 232rpx;
						  height: 368rpx;
					  }
					  &:nth-child(n+2) {
						  width: 236rpx;
						  height: 188rpx;
					  }
					  image {
						  width: 100%;
						  height: 100%;
					  }
				  }
			  }
		  }
	  }
  }
}
</style>
