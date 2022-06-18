<template>
	<div class="type-nav">
		<div class="container">
			<!-- 移动到全部商品分类也不会移除 -->
			<!-- 事件委派 -->
			<div @mouseleave="leaveIndex" @mouseenter="entershow">
				<h2 class="all">全部商品分类</h2>
				<transition name="sort">
					<div class="sort" v-show="show">
						<div class="all-sort-list2" @click="goSearch">
							<div
								class="item"
								v-for="(c1, index) in categoryList"
								:key="c1.categoryId"
								:class="{ cur: currentIndex == index }"
							>
								<!-- 一级分类 -->
								<h3 @mouseenter="changeIndex(index)">
									<!-- 编程式导航 是一个组件,当服务器返回数据之后,回循环出很多的router-link(创建组件实例)所以很卡顿-->
									<!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
									<a
										href="javascript:"
										:data-categoryName="c1.categoryName"
										:data-category1Id="c1.categoryId"
										>{{ c1.categoryName }} {{ index }}</a
									>
								</h3>
								<!-- 二三级分类 -->
								<div
									class="item-list clearfix"
									:style="{ display: currentIndex == index ? 'block' : 'none' }"
								>
									<div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
										<dl class="fore">
											<dt>
												<a
													href="javascript:"
													:data-categoryName="c2.categoryName"
													:data-category2Id="c2.categoryId"
													>{{ c2.categoryName }}</a
												>
											</dt>
											<dd>
												<em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
													<a
														href="javascript:"
														:data-categoryName="c3.categoryName"
														:data-category3Id="c3.categoryId"
														>{{ c3.categoryName }}</a
													>
												</em>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
// 这样是把lodash全部功能引入
// import _ from 'lodash'  下方按需引入
import throttle from 'lodash/throttle';

export default {
	name: 'TypeNav',
	data() {
		return {
			currentIndex: -1,
			show: true //初始默认展示
		};
	},
	//组件挂载完毕就可以发请求
	mounted() {
		if (this.$route.path != '/home') {
			this.show = false;
		}
	},
	computed: {
		...mapState({
			// 右侧需要的是一个函数,当使用计算属性的时候 右侧的函数会立即执行,会注入state,值为大仓库的数据
			categoryList: state => state.home.categoryList
		})
	},
	methods: {
		// 鼠标进入修改响应式数据currentIndex的值
		// 用节流 throttle别用箭头函数
		changeIndex: throttle(function (index) {
			// index鼠标移上某一个一级元素的索引值
			// 正常情况下(用户慢一点操作): 鼠标进入,每一个h3都会触发鼠标进入事件
			// 非正常情况(用户操作很快): 应该都触发,经过测试只有部分触发了
			// 由于用户行为过快,导致浏览器反应不过来,如果当前函数中有一些大量业务,则可能出现卡顿现象
			this.currentIndex = index;
		}, 50),

		// 一级分类鼠标移除事件的回调
		leaveIndex() {
			this.currentIndex = -1;
			if (this.$route.path != '/home') {
				this.show = false;
			}
		},
		goSearch(event) {
			//  进行搜索跳转  解决方案: 编程式导航加事件委派
			// 1:怎么确定点击的一定是a标签,2:如果进行参数获得传递
			// 给每一个子节点中的a标签,加上自定义属性data-categoryName,其余节点是没有的
			// event事件对象可以获取触发当前事件的节点,里面都有
			let element = event.target;
			// console.log(element.dataset); //DOMStringMap {categoryname: '电脑办公', category1id: '6'}
			// 节点有一个属性dataset属性,可以获取节点的自定义属性,结构出来
			let { categoryname, category1id, category2id, category3id } = element.dataset;
			if (categoryname) {
				//如果有categoryname属性,一定是a标签
				// 整理路由跳转参数
				let loction = { name: 'search' };
				let query = { categoryName: categoryname };
				// 区别一级分类.二级分类,三级分类的a标签
				if (category1id) {
					query.category1Id = category1id;
				} else if (category2id) {
					query.category2Id = category2id;
				} else {
					query.category3Id = category3id;
				}
				// 如果路由跳转带有parmas一块合并带过去
				if (this.$route.params) {
					loction.params = this.$route.params;
					//整理完参数 合并
					loction.query = query;
					this.$router.push(loction);
				}
			}
		},
		// 鼠标移入商品展示
		entershow() {
			this.show = true;
		}
	}
};
</script>

<style lang="less">
.type-nav {
	border-bottom: 2px solid #e1251b;

	.container {
		width: 1200px;
		margin: 0 auto;
		display: flex;
		position: relative;

		.all {
			width: 210px;
			height: 45px;
			background-color: #e1251b;
			line-height: 45px;
			text-align: center;
			color: #fff;
			font-size: 14px;
			font-weight: bold;
		}

		.nav {
			a {
				height: 45px;
				margin: 0 22px;
				line-height: 45px;
				font-size: 16px;
				color: #333;
			}
		}

		.sort {
			position: absolute;
			left: 0;
			top: 45px;
			width: 210px;
			height: 461px;
			position: absolute;
			background: #fafafa;
			z-index: 999;

			.all-sort-list2 {
				.item {
					h3 {
						line-height: 30px;
						font-size: 14px;
						font-weight: 400;
						overflow: hidden;
						padding: 0 20px;
						margin: 0;

						a {
							color: #333;
						}
					}

					.item-list {
						display: none;
						position: absolute;
						width: 734px;
						min-height: 460px;
						background: #f7f7f7;
						left: 210px;
						border: 1px solid #ddd;
						top: 0;
						z-index: 9999 !important;

						.subitem {
							float: left;
							width: 650px;
							padding: 0 4px 0 8px;

							dl {
								border-top: 1px solid #eee;
								padding: 6px 0;
								overflow: hidden;
								zoom: 1;

								&.fore {
									border-top: 0;
								}

								dt {
									float: left;
									width: 54px;
									line-height: 22px;
									text-align: right;
									padding: 3px 6px 0 0;
									font-weight: 700;
								}

								dd {
									float: left;
									width: 415px;
									padding: 3px 0 0;
									overflow: hidden;

									em {
										float: left;
										height: 14px;
										line-height: 14px;
										padding: 0 8px;
										margin-top: 5px;
										border-left: 1px solid #ccc;
									}
								}
							}
						}
					}
				}
			}
			.cur {
				background-color: skyblue;
			}
		}
		.sort-enter {
			height: 0px;
		}
		.sort-enter-to {
			height: 461px;
		}
		.sort-enter-active {
			transition: all 0.5s linear;
		}
	}
}
</style>
