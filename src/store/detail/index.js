import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api';

// 需要回到大仓库进行合并
const state = {
	goodinfo: {}
};
const mutations = {
	GETGOODINFO(state, goodinfo) {
		state.goodinfo = goodinfo;
	}
};
const actions = {
	// 获取产品信息action
	async getGoodInfo({ commit }, skuid) {
		let result = await reqGoodsInfo(skuid);
		if (result.code == 200) {
			commit('GETGOODINFO', result.data);
		}
	},
    // 加入购物车返回的结果 解构
    // 加入购物车以后发请求 前台将参数带给服务器
    // 服务器写入数据成功,并没有返回其他数据,只是返回了code=200代表成功
    // 因为没有返回数据 不需要三连环存储数据
    // 返回的是promise要么成功要么失败
	async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
		let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if(result.code == 200){
            // 只要是非空字符串都为成功
            return 'ok'
            
        }else{
            return Promise.reject(new Error('faile'))
        }
	}
};
// 简化数据而生
const getters = {
	// 路径导航简化
	categoryView(state) {
		// 当前计算出来的属性值至少是个空对象
		return state.goodinfo.categoryView || {};
	},
	// 产品信息简化
	skuInfo(state) {
		return state.goodinfo.skuInfo || {};
	},
	// 产品售卖属性
	spuSaleAttrList(state) {
		return state.goodinfo.spuSaleAttrList || [];
	}
};
export default {
	state,
	actions,
	mutations,
	getters
};
