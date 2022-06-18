import { reqGetSearchInfo } from '@/api';
// search模块的小仓库
// 仓库存储数据的地方
const state = {
	searchList: {}
};

// 修改state的唯一手段
const mutations = {
	GETSEARCHLIST(state, searchList) {
		state.searchList = searchList;
	}
};

// 处理actions 可以书写自己的业务逻辑 也可以处理异步
const actions = {
	// 获取search数据   第二个参数术语载荷,dispatch的第二个参数传过来的,至少是一个空对象
	async getSearchList({ commit }, params = {}) {
		let result = await reqGetSearchInfo(params);
		if (result.code == 200) {
			commit('GETSEARCHLIST', result.data);
		}
	}
};

// 理解为计算属性 用于简化仓库数据,
// 不建议这样写,用getters---->goodsList:state=>state.search.searchList.goodsList
const getters = {
	// state当前仓库的state,并非大仓库的state
	goodsList(state) {
		// 这样书写有问题,如果没网,请求发不出去,searchList永远为空,这里的值要么是undfind,要么是服务器返回的 所以至少返回一个空数组
		return state.searchList.goodsList || [];
	},
	trademarkList(state) {
		return state.searchList.trademarkList;
	},
	attrsList(state) {
		return state.searchList.attrsList;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
