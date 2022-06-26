const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    // 要map文件可以在上线的时候报错精准到哪一行 上线了没必要要 
	productionSourceMap: false,
	transpileDependencies: true,
	lintOnSave: false,
	// 代理跨域
	devServer: {
		proxy: {
			'/api': {
				target: 'http://gmall-h5-api.atguigu.cn'
				// target: 'https://mock.presstime.cn/mock/629df60b1a23490028bcaf5e/'
				// pathRewrite:{'^api': ''},
			}
		}
	}
});
