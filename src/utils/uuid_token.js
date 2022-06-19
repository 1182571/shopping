import { v4 as uuidv4 } from 'uuid';
// 生成一个随机串 每次执行不能发生变化
// 接口只能获取两个参数 uuid通过请求头带过去 请求拦截器
export const getUUID =()=> {
	// 先从本地存储获取uuid
	let uuid_token = localStorage.getItem('UUIDTOKEN');
	// 如果没有 生成临时身份
	if (!uuid_token) {
		uuid_token = uuidv4();
		// 本地存储一次
		localStorage.setItem('UUIDTOKEN', uuid_token);
	}
	// 一定要有返回值没有返回值是undefined
	return uuid_token;
};
