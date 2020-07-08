export default function (Vue) {
    const baseUrl = 'https://api-ugo-web.itheima.net'
    Vue.prototype.request = async function (obj) {
        uni.showLoading({
            title: '加载中'
        });
        const { url, data } = obj;
        const [err, res] = await uni.request({
            url: baseUrl + url,
            data: data
        })
        uni.hideLoading();
        return res.data.message
    }
}