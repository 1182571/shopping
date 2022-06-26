// 引入路由组件
//拆开路由
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
// 引入二级路由组件
import myOrder from '@/pages/Center/myOrder';
import groupOrder from '@/pages/Center/groupOrder';

export default [
	{
		path: '/center',
		component: Center,
		meta: { show: true },
		// 二级路由组件
		children: [
			{
				path: 'myorder',
				component: myOrder
			},
			{
				path: 'grouporder',
				component: groupOrder
			},
			{
				path: '/center',
				redirect: '/center/myorder'
			}
		]
	},
	{
		path: '/paysuccess',
		component: PaySuccess,
		meta: { show: true }
	},
	{
		path: '/pay',
		component: Pay,
		meta: { show: true },
		beforeEnter: (to, from, next) => {
			// 去支付页面只能在交易页去
			if (from.path == '/trade') {
				next();
			} else {
				// 中断当前导航  从哪来到哪去
				next(false);
			}
		}
	},
	{
		path: '/trade',
		component: Trade,
		meta: { show: true },
		// 路由独享的守卫 在进入路由前判断是否符合条件
		beforeEnter: (to, from, next) => {
			// 去交易页面只能在购物车去
			if (from.path == '/ShopCart') {
				next();
			} else {
				// 中断当前导航  从哪来到哪去
				next(false);
			}
		}
	},
	{
		path: '/shopCart',
		component: ShopCart,
		meta: { show: true }
	},
	{
		path: '/search',
		component: () => import('@/pages/Search'),
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
		// // 路由懒加载 只有访问的时候才会加载
		// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
		component: () => import('@/pages/Home'),
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
