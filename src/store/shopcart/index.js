import { reqCarList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api';
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const actions = {
    // 获取购物车数据
    async getCartList({ commit }) {
        let result = await reqCarList();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data);
        }
    },
    // 删除购物车某一个  没有返回值 没必要三连环 组件需要知道是否成功 成功发请求 失败弹出错误信息
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 切换购物车状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // context上下文 小仓库 有mutions getters dispatch state
    // dispatch 转发action
    deleteAllCheckCart({ dispatch, getters }) {
        // 获取购物车全部产品
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            // 每一次返回的一个promise  promise.all是一个数组 都成功为成功
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
            PromiseAll.push(promise);
        });
        // 只要有一个p1失败就为失败
        return Promise.all(PromiseAll);
    },
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(element => {
            let promise =  dispatch('updateCheckedById', { skuId: element.skuId, isChecked });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
};
const getters = {
    cartList(state) {
        // 是个对象要第0项
        return state.cartList[0] || {};
    }
};
export default {
    state,
    mutations,
    actions,
    getters
};
