const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	// 代理跨域
	devServer: {
		proxy: {
			'/api': {
				target:'http://gmall-h5-api.atguigu.cn',
				// target: 'https://mock.presstime.cn/mock/629df60b1a23490028bcaf5e/'
				// pathRewrite:{'^api': ''},
			}
		}
	}
});
