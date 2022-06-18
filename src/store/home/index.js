// home模块的小仓库
// 引用发请求
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api';
// 仓库存储数据的地方
const state = {
	// 默认数据初始值根据服务器返回的结果来
	categoryList: [],
	// 轮播图的数据
	bannerList: [],
	// floor组件的数据
	floorList: []
};

// 修改state的唯一手段
const mutations = {
	CATEGORYLIST(state, categoryList) {
		state.categoryList = categoryList;
	},
	// 将banner数据写入数组
	GETBANNERLIST(state, bannerList) {
		state.bannerList = bannerList;
	},
	GETFLOORLIST(state, floorList) {
		state.floorList = floorList;
	}
};

// 处理actions 可以书写自己的业务逻辑 也可以处理异步
const actions = {
	// 通过api的接口函数调用 获取数据
	async categoryList({ commit }) {
		const result = await reqCategoryList();
		if (result.code === 200) {
			commit('CATEGORYLIST', result.data);
		}
	},
	// 获取首页轮播图的数据
	async getBannerList({ commit }) {
		let res = await reqGetBannerList();
		if (res.code == 200) {
			commit('GETBANNERLIST', res.data);
		}
	},
	async getFloorlist({ commit }) {
		const result = await reqFloorList();
		if (result.code == 200) {
			commit('GETFLOORLIST', result.data);
		}
	}
};

// 理解为计算属性 用于简化仓库数据
const getters = {};

export default {
	state,
	mutations,
	actions,
	getters
};
