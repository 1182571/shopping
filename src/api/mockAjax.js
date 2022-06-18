import axios from 'axios';
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css'


// 配置一下axios 利用axios对象的方法create 创建axios实例
const requests = axios.create({
	// 基础路径 发请求的时候路径就会带/api
	baseURL: '/mock',
	timeout: 5000
});

// 请求拦截器  在请求发送前 做一些事情
requests.interceptors.request.use(config => {
	// config 配置对象 里面有一个header很重要
    // 进度条开始动 nprogress身上的start方法代表开始  done代表结束
    nprogress.start()
	return config;
});

// 响应拦截器
requests.interceptors.response.use((res)=>{
     // 成功的回调函数 : 服务器相应的数据回来以后 响应拦截器可以检测到
    //  进度条结束
    nprogress.done()
    return  res.data
},(error)=>{
    return Promise.reject(new Error('faile'))
});


export default requests;
