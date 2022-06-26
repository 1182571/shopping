// 当前模块 : 接口过多 不移维护 api进行统一管理
import requests from './request';
import mockRequests from './mockAjax';

// 三级联动接口 /api/product/getBaseCategoryList  对外暴露一个函数 用到的时候调用一下函数就行了
// 写一个函数通过封装的axios发送请求，只要是需要请求相同api接口地方的直接调用函数就可以了

// 不写return返回的默认是undfind
// 发送请求 axios发送的请求返回的结果是promise对象
export const reqCategoryList = () =>
	requests({
		url: '/product/getBaseCategoryList',
		method: 'get'
	});

// 获取banner
export const reqGetBannerList = () => mockRequests.get('/banner');

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor');

// 获取搜索模块的数据
// 当前函数需要参数  当前接口默认参数至少是一个空对象
export const reqGetSearchInfo = params =>
	requests({
		url: '/list',
		method: 'post',
		data: params
	});

// 获取产品详情页的接口
export const reqGoodsInfo = skuid =>
	requests({
		url: `/item/${skuid}`,
		method: 'get'
	});
//讲产品添加到购物车
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
	requests({
		url: `/cart/addToCart/${skuId}/${skuNum}`,
		method: 'post'
	});
// 获取购物车数据的接口
export const reqCarList = () => requests({ url: '/cart/cartList', method: 'get' });
// 删除购物车产品接口
export const reqDeleteCartById = skuId =>
	requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
// 切换产品选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedByid = (skuId, isChecked) =>
	requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
// 获取验证码请求
// /api/user/passport/sendCode/{phone}
export const reqGetCode = phone =>
	requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
// 注册的接口
// /api/user/passport/register 路径中没说带参 data可以带参  带三个参数phone password code写成一个对象
export const reqUserRegister = data =>
	requests({ url: '/user/passport/register', data, method: 'post' });
// 登录接口 /api/user/passport/login post  参数phone password
export const reqUserLogin = data => requests({ url: '/user/passport/login', data, method: 'post' });
// 获取用户信息/api/user/passport/auth/getUserInfo   需要带着用户token要用户信息  用请求头带信息
export const reqUserInfo = () =>
	requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });
// 退出登录
export const reqLoginOut = () => requests({ url: '/user/passport/logout', method: 'get' });
// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () =>
	requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });
//获取订单交易页信息 /api/order/auth/trade
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' });
// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} post    不用vuex的写法
export const reqSubmitOrder = (tradeNo, data) =>
	requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });
//获取订单支付信息 /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = orderId =>
	requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
// 获取支付支付状态 /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = orderId =>
	requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });
    //获取我的订单列表  /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}` ,method:'get'});