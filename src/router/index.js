//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
// 使用插件
Vue.use(VueRouter);
import routes from './routes';
//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push 解决编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误
// 函数的第一个参数 告诉原来的push方法 往哪里跳转 第二三个参数:成功的回调 失败的回调
// call 和 apply 传递参数的区别  相同点:都可以改变函数上下文,并执行一次函数 不同点:apply传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
	if (resolve && reject) {
		// 如果两个参数都传了,调用原来人家的push方法 并把上下文改为router的实例
		originPush.call(this, location, resolve, reject);
	} else {
		originPush.call(
			this,
			location,
			() => {},
			() => {}
		);
	}
};
// 重写replace
VueRouter.prototype.replace = function (location, resolve, reject) {
	if (resolve && reject) {
		originReplace.call(this, location, resolve, reject);
	} else {
		originReplace.call(
			this,
			location,
			() => {},
			() => {}
		);
	}
};

// 配置路由
let router = new VueRouter({
	routes,
	scrollBehavior(to, from, savedPosition) {
		// 始终滚动到顶部
		return { y: 0 };
	}
});
// 全局路由守卫  在路由跳转进行判断
router.beforeEach(async (to, from, next) => {
	// 有了token代表登录了  在store中
	let token = store.state.user.token;
	// 是否有用户的信息
	let name = store.state.user.userInfo.name;
	if (token) {
		// 用户登陆了去login
		if (to.path == '/login') {
			next('/home');
		} else {
			// 登陆了去的不是login 用户名已经有
			if (name) {
				next();
			} else {
				// 没有用户信息 派发action获取
				try {
					await store.dispatch('getUSerInfo');
					next();
				} catch (error) {
					// token失效了 清楚所有信息 回到登录
					await store.dispatch('userLogOut');
					next('/login');
				}
			}
		}
	} else {
		// 未登录 不能去center交易相关,不能去支付相关pay paysuccess 不能去个人中心 跳转登录
		let toPath = to.path;
		if (
			toPath.indexOf('/trade') != -1 ||
			toPath.indexOf('/pay') != -1 ||
			toPath.indexOf('/center') != -1
		) {
            // 把未登录想去而没去成的信息存储与地址栏中
			next('/login?redirect=' + toPath);
		} else {
			next();
		}
	}
});

export default router;
