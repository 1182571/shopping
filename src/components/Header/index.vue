<template>
	<header class="header">
		<!-- 头部的第一行 -->
		<div class="top">
			<div class="container">
				<div class="loginList">
					<p>尚品汇欢迎您！</p>
                    <!-- 没有用户名显示 -->
					<p v-if="!userName">
						<span>请</span>
						<router-link to="/login">登录</router-link>
						<router-link to="/register" class="register">免费注册</router-link>
					</p>
                    <p v-else>
                        <a href="">{{userName}}</a>
                        <a class="register" href="" @click="loginOut">退出登录</a>
                    </p>
				</div>
				<div class="typeList">
					<router-link to="/center/myorder">我的订单</router-link>
					<router-link to="/ShopCart">我的购物车</router-link>
					<a href="###">我的尚品汇</a>
					<a href="###">尚品汇会员</a>
					<a href="###">企业采购</a>
					<a href="###">关注尚品汇</a>
					<a href="###">合作招商</a>
					<a href="###">商家后台</a>
				</div>
			</div>
		</div>
		<!--头部第二行 搜索区域-->
		<div class="bottom">
			<h1 class="logoArea">
				<router-link to="/home" class="logo">
					<img src="./images/logo.png" alt="" />
				</router-link>
			</h1>
			<div class="searchArea">
				<form action="###" class="searchForm">
					<input
						v-model="keyword"
						type="text"
						id="autocomplete"
						class="input-error input-xxlarge"
					/>
					<button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
						搜索
					</button>
				</form>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'Header',
	data() {
		return {
			keyword: ''
		};
	},
	methods: {
		// 搜索按钮的回调 需要像search路由进行跳转
		goSearch() {
			// 第一种字符串形式 params参数需要在路由中占位 path: '/search/:keyword',：
			// this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase());
			// 第二种写法 模板字符串写法
			// this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
			// 第三种对象传参写法 params要用name
			// this.$router.push({
			// 	name: 'search',
			// 	params: {
			// 		keyword: this.keyword
			// 	},
			// 	query: {
			// 		k: this.keyword.toUpperCase()
			// 	}
			// });

			// ******************************************
			// 面试题1: 路由传递参数(对象写法)path是否可以结合params参数一起使用
			// 答: 路由跳转传参的时候 对象写法可以使name path形式 但需要注意的是 path这种写法不能与params参数一起使用
			// this.$router.push({path:'/search',params:{keyword: this.keyword},quary:{k:this.keyword.toUpperCase()}})

			// 面试题2: 如何指定params参数可传可不传  占位了params参数 但是路由跳转的时候不传递  路径会出现问题
			// 答: 在配置路由的时候 后面加一个? path: '/search/:keyword？',
			// this.$router.push({name:'search',query:{k:this.keyword.toUpperCase()}})

			// 面试题3： params参数可传可不传,如果传递的是空串怎么解决
			// 答: 使用undefined解决 params参数可以传递不传递(空字符串)
			// this.$router.push({name:'search',params:{keyword:'' || undefined},query:{k:this.keyword.toUpperCase()}})

			// 面试题4: 路由组件能不能传递props数据
			// 答: 可以的 三种写法

			// 如果路由跳转带有query一块合并带过去
			if (this.$route.query) {
				let loction = {
					name: 'search',
					params: {
						keyword: this.keyword
					}
				};
				loction.query = this.$route.query;
				this.$router.push(loction);
			}
		},
        // 退出登录
        loginOut(){
            // 发送请求通知服务器退出登录 清楚token
            // 清楚项目当中的userinfo token
            try {
                this.$store.dispatch('userLogOut')
                this.$router.push('/home')
            } catch (error) {
                alert(error.message)
            }
        }
	},
    // 通过全局事件总线清除keyword
    mounted() {
        this.$bus.$on('clear',()=>{
            this.keyword = ''
        })
    },
    computed:{
        userName(){
            // 用户名信息
            return this.$store.state.user.userInfo.name
        }
    },
};
</script>

<style lang="less">
.header {
	& > .top {
		background-color: #eaeaea;
		height: 30px;
		line-height: 30px;

		.container {
			width: 1200px;
			margin: 0 auto;
			overflow: hidden;

			.loginList {
				float: left;

				p {
					float: left;
					margin-right: 10px;

					.register {
						border-left: 1px solid #b3aeae;
						padding: 0 5px;
						margin-left: 5px;
					}
				}
			}

			.typeList {
				float: right;

				a {
					padding: 0 10px;

					& + a {
						border-left: 1px solid #b3aeae;
					}
				}
			}
		}
	}

	& > .bottom {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;

		.logoArea {
			float: left;

			.logo {
				img {
					width: 175px;
					margin: 25px 45px;
				}
			}
		}

		.searchArea {
			float: right;
			margin-top: 35px;

			.searchForm {
				overflow: hidden;

				input {
					box-sizing: border-box;
					width: 490px;
					height: 32px;
					padding: 0px 4px;
					border: 2px solid #ea4a36;
					float: left;

					&:focus {
						outline: none;
					}
				}

				button {
					height: 32px;
					width: 68px;
					background-color: #ea4a36;
					border: none;
					color: #fff;
					float: left;
					cursor: pointer;

					&:focus {
						outline: none;
					}
				}
			}
		}
	}
}
</style>
