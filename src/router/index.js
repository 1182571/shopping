//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
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
export default new VueRouter({
	routes,
	scrollBehavior(to, from, savedPosition) {
		// 始终滚动到顶部
		return { y: 0 };
	}
});
