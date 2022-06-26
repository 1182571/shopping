import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
// 引入三级联动组件并注册为全局组件
import TypeNav from '@/components/TypeNav';
// 注册轮播图全局组件
import Carousel from '@/components/Carousel';
// 注册分页器为全局组件
import Pagination from '@/components/Pagination';
// 引入store仓库
import store from '@/store';
// 引入mockSearch.js数据
import '@/mock/morkServer.js';
// 引入swiper样式
import 'swiper/css/swiper.css';
// 统一接口api全部请求函数
import * as API from '@/api';
// 按需引入elementui
import { Button, MessageBox } from 'element-ui';
// 图片懒加载
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/1.gif'
// 引入表单验证插件
import  '@/plugins/validate'
// 只要use实质调用了install方法
Vue.use(VueLazyload, {
	// 懒加载默认图
	loading: atm
});
// 第一个参数全局组件名字 第二个参数那一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// 全局注册button
Vue.component(Button.name, Button);
// eleui第二种注册方式 挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false;
new Vue({
	render: h => h(App),
	// 全局事件总线
	beforeCreate() {
		Vue.prototype.$bus = this;
		Vue.prototype.$API = API;
	},
	// 注册路由: Key value 一致使用简写 组件身上都会拥有$route,$router属性
	router,
	// 注册仓库: 组件实例身上会多$store属性
	store
}).$mount('#app');
