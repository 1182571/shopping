import Vue from 'vue';
import Vuex from 'vuex';

// vuex是插件
Vue.use(Vuex);

// 引入小仓库
import home from './home';
import search from './search';
import deatil from './detail'

// 对外暴露Store类的实例
export default new Vuex.Store({
	// 注册小仓库模块 模块式开发存储数据
	modules: {
		home,
		search,
		deatil
	}
});
