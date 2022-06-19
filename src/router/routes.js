// 引入路由组件

//拆开路由
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
export default [
	{
		path: '/shopCart',
		component: ShopCart,
		meta: { show: true }
	},
	{
		path: '/search',
		component: Search,
		name: 'search',
		meta: { show: true }
	},
	{
		// 点击商品图片跳转详情页,需要带上产品的id
		path: '/detail/:skuid',
		component: Detail,
		meta: { show: true }
	},
	{
		path: '/home',
		component: Home,
		meta: { show: true }
	},
	{
		path: '/login',
		component: Login,
		meta: { show: false }
	},
	{
		path: '/register',
		component: Register,
		meta: { show: false }
	},
	{
		path: '/register',
		component: Register,
		meta: { show: false }
	},
	{
		path: '/addCartSuccess',
		component: AddCartSuccess,
		meta: { show: true },
		name: 'addCartSuccess',
		// 路由组件能不能传递props数据?
		// 布尔值写法: 则会把params收到的所有参数传给Search组件 只能传params参数
		// props:true
		// 对象写法  额外的给路由组件传递一些props 通过key value的形式 不常用
		// props:{a:1,b:2}
		// 函数写法 可以params参数 quary参数通过props传给组件
		props($route) {
			//会得到路由的信息
			return { keyword: $route.params.keyword, k: $route.query.k };
		}
	},
	{
		// 重定向 访问任意跳转到首页
		path: '*',
		redirect: '/home'
	}
];
