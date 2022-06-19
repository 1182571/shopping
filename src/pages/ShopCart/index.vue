<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
					<li class="cart-list-con1">
						<input
							type="checkbox"
							name="chk_list"
							:checked="cart.isChecked"
							@change="updateChecked(cart, $event)"
						/>
					</li>
					<li class="cart-list-con2">
						<img :src="cart.imgUrl" />
						<div class="item-msg">{{ cart.skuName }}</div>
					</li>

					<li class="cart-list-con4">
						<span class="price">{{ cart.cartPrice }}</span>
					</li>
					<li class="cart-list-con5">
						<a href="javascript:void(0)" class="mins" @click="handler('mainus', -1, cart)">-</a>
						<input
							autocomplete="off"
							type="text"
							:value="cart.skuNum"
							minnum="1"
							class="itxt"
							@change="handler('change', $event.target.value * 1, cart)"
						/>
						<a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{ cart.skuNum * cart.cartPrice }}</span>
					</li>
					<li class="cart-list-con7">
						<a class="sindelet" @click="deleteCartId(cart)">删除</a>
						<br />
						<a href="#none">移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input class="chooseAll" type="checkbox" :checked="isAllCheck" />
				<span>全选</span>
			</div>
			<div class="option">
				<a href="#none">删除选中的商品</a>
				<a href="#none">移到我的关注</a>
				<a href="#none">清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">已选择 <span>0</span>件商品</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{ totalPrice }}</i>
				</div>
				<div class="sumbtn">
					<a class="sum-btn" href="###" target="_blank">结算</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle';
export default {
	name: 'ShopCart',
	mounted() {
		// 防止请求发送多次
		this.getData();
	},
	methods: {
		getData() {
			// 获取购物车个人数据
			this.$store.dispatch('getCartList');
		},
		// 派发action 通知服务器修改个数[节流]
		handler: throttle(async function (type, disnum, cart) {
			// type区分三个元素
			// disnum 变化量是加是减
			// id 是哪一个产品 在循环身上
			// console.log(type,disnum,id);
			switch (type) {
				case 'add':
					disnum = 1;
					break;
				case 'mainus':
					// 判断产品个数大于1 才可以传递给服务器
					// 如果产品数量小于等于1 传给服务器0 原封不动
					disnum = cart.skuNum > 1 ? -1 : 0;
					break;
				case 'change':
					// 如果是非法的 或者负数
					if (isNaN(disnum) || disnum < 1) {
						disnum = 0;
					} else {
						// 正常情况 小数取整
						disnum = parseInt(disnum) - cart.skuNum;
					}
					// 三元写法
					// disnum = (isNaN(disnum)||disnum<1)?0:parseInt(disnum) -cart.skuNum
					break;
			}
			// 派发action
			try {
				await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disnum });
				this.getData();
			} catch (error) {}
		}, 1000),
		// 删除一个产品的操作
		async deleteCartId(cart) {
			try {
				// 如果删除成功再次发请求得到新的数据进行展示
				await this.$store.dispatch('deleteCartListBySkuId', cart.skuId);
				this.getData();
			} catch (error) {
				alert(error.message);
			}
		},
		// 修改勾选状态
		async updateChecked(cart, event) {
			// 带给服务器的参数不应该是布尔值  应该是0 |1
			try {
				// 如果修改成功
				let isChecked = event.target.checked ? '1' : '0';
				await this.$store.dispatch('updateCheckedById', { skuId: cart.skuId, isChecked });
				this.getData();
			} catch (error) {
				alert(error.message);
			}
		}
	},
	computed: {
		...mapGetters(['cartList']),
		// 购物车的数据
		cartInfoList() {
			return this.cartList.cartInfoList || [];
		},
		// 计算购买产品的总价
		totalPrice() {
			let res = this.cartInfoList
				.filter(item => {
					return item.isChecked === 1;
				})
				.map(item => {
					return item.skuNum * item.skuPrice;
				})
				.reduce((pre, cur) => {
					return pre + cur;
				}, 0);
			return res;
		},
		// every 是所有都真才真 some是有一个真就真 全选按钮
		isAllCheck() {
			return this.cartInfoList.every(item => item.isChecked == 1);
		}
	}
};
</script>

<style lang="less" scoped>
.cart {
	width: 1200px;
	margin: 0 auto;

	h4 {
		margin: 9px 0;
		font-size: 14px;
		line-height: 21px;
	}

	.cart-main {
		.cart-th {
			background: #f5f5f5;
			border: 1px solid #ddd;
			padding: 10px;
			overflow: hidden;

			& > div {
				float: left;
			}

			.cart-th1 {
				width: 25%;

				input {
					vertical-align: middle;
				}

				span {
					vertical-align: middle;
				}
			}

			.cart-th2 {
				width: 25%;
			}

			.cart-th3,
			.cart-th4,
			.cart-th5,
			.cart-th6 {
				width: 12.5%;
			}
		}

		.cart-body {
			margin: 15px 0;
			border: 1px solid #ddd;

			.cart-list {
				padding: 10px;
				border-bottom: 1px solid #ddd;
				overflow: hidden;

				& > li {
					float: left;
				}

				.cart-list-con1 {
					width: 15%;
				}

				.cart-list-con2 {
					width: 35%;

					img {
						width: 82px;
						height: 82px;
						float: left;
					}

					.item-msg {
						float: left;
						width: 150px;
						margin: 0 10px;
						line-height: 18px;
					}
				}

				.cart-list-con4 {
					width: 10%;
				}

				.cart-list-con5 {
					width: 17%;

					.mins {
						border: 1px solid #ddd;
						border-right: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
					}

					input {
						border: 1px solid #ddd;
						width: 40px;
						height: 33px;
						float: left;
						text-align: center;
						font-size: 14px;
					}

					.plus {
						border: 1px solid #ddd;
						border-left: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
					}
				}

				.cart-list-con6 {
					width: 10%;

					.sum {
						font-size: 16px;
					}
				}

				.cart-list-con7 {
					width: 13%;

					a {
						color: #666;
					}
				}
			}
		}
	}

	.cart-tool {
		overflow: hidden;
		border: 1px solid #ddd;

		.select-all {
			padding: 10px;
			overflow: hidden;
			float: left;

			span {
				vertical-align: middle;
			}

			input {
				vertical-align: middle;
			}
		}

		.option {
			padding: 10px;
			overflow: hidden;
			float: left;

			a {
				float: left;
				padding: 0 10px;
				color: #666;
			}
		}

		.money-box {
			float: right;

			.chosed {
				line-height: 26px;
				float: left;
				padding: 0 10px;
			}

			.sumprice {
				width: 200px;
				line-height: 22px;
				float: left;
				padding: 0 10px;

				.summoney {
					color: #c81623;
					font-size: 16px;
				}
			}

			.sumbtn {
				float: right;

				a {
					display: block;
					position: relative;
					width: 96px;
					height: 52px;
					line-height: 52px;
					color: #fff;
					text-align: center;
					font-size: 18px;
					font-family: 'Microsoft YaHei';
					background: #e1251b;
					overflow: hidden;
				}
			}
		}
	}
}
</style>
