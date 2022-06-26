import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLoginOut } from '@/api';
import { setToken, getToken, removeToken } from '@/utils/token';
const state = {
	code: '',
	// 如果没有就是空 下次读取的时候直接读取
	// token: localStorage.getItem('TOKEN'),
	token: getToken(),
	userInfo: {}
};
// 报错name属性没有定义的同学，在仓库getters设置一下state.userInfo||{}
const mutations = {
	// 将验证码放入仓库
	GETCODE(state, code) {
		state.code = code;
	},
	USERLOGIN(state, token) {
		// vuex存储数据不是持久化的 一刷新全没了
		state.token = token;
	},
	GETUSERINFO(state, userInfo) {
		state.userInfo = userInfo || {};
	},
	// 清楚本地数据
	CLEAR(state) {
		state.token = '';
		(state.userInfo = {}), removeToken();
	}
};
const actions = {
	// 获取验证码
	async getCode({ commit }, phone) {
		// 直接把验证码反返回了 正常情况应该返回到用户手机上
		let result = await reqGetCode(phone);
		if (result.code == 200) {
			commit('GETCODE', result.data);
			return 'ok';
		} else {
			return Promise.reject(new Error('faile'));
		}
	},
	// 用户的注册
	async userRegister({ commit }, user) {
		let result = await reqUserRegister(user);
		if (result.code == 200) {
			return 'ok';
		} else {
			return Promise.reject(new Error('faile'));
		}
	},
	// 登录业务
	async userLogin({ commit }, data) {
		let result = await reqUserLogin(data);
		// 服务器下发的token 用户的唯一标识符
		// 将来经常通过带token找服务器要用户信息
		console.log(result);
		if (result.code == 200) {
			commit('USERLOGIN', result.data.token);
			// 持久化存储token  本身就是字符串 不用转
			// localStorage.setItem('TOKEN', result.data.token);
			setToken(result.data.token);
			return 'ok';
		} else {
			return Promise.reject(new Error('faile'));
		}
	},
	// 获取用户信息
	async getUSerInfo({ commit }) {
		let result = await reqUserInfo();
		// 存用户数据
		if (result.code == 200) {
			commit('GETUSERINFO', result.data);
			return 'ok';
		} else {
			return Promise.reject(new Error('faile'));
		}
	},
	// 退出登录
	async userLogOut({ commit }) {
		// 只是清除了服务器的token
		let result = await reqLoginOut();
		// action里面不能操作数据
		if (result.code == 200) {
			commit('CLEAR');
			return 'ok';
		} else {
			return Promise.reject(new Error('faile'));
		}
	}
};

const getters = {};
export default {
	state,
	mutations,
	actions,
	getters
};
