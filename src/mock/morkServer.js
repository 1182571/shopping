import  Mock from "mockjs"

//把json数据格式引进来 没有引入为啥可以引入
// webpack默认对外暴露 图片 json数据格式
import banner from './banner'
import floor from './floors'

// mock数据 第一个参数请求的地址 第二个参数请求的数据
Mock.mock("/mock/banner",{code:200,data:banner}) //模拟首页轮播图数据
Mock.mock("/mock/floor",{code:200,data:floor})