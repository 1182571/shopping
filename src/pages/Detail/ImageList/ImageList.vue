<template>
	<div class="swiper-container" ref="cur">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(slide, index) in skuImageList" :key="slide.index">
				<img
					:src="slide.imgUrl"
					:class="{ active: currcentIndex == index }"
					@click="changeCurrcentIndex(index)"
				/>
			</div>
		</div>
		<div class="swiper-button-next"></div>
		<div class="swiper-button-prev"></div>
	</div>
</template>

<script>
import Swiper from 'swiper';
export default {
	name: 'ImageList',
	data() {
		return {
			currcentIndex: 0
		};
	},
	props: ['skuImageList'],
	watch: {
		// 详情页轮播图,保证数据ok,不保证v-for遍历结构是否完整
		skuImageList() {
			this.$nextTick(() => {
				new Swiper(this.$refs.cur, {
					// 如果需要前进后退按钮
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},

					// 如果需要滚动条
					scrollbar: {
						el: '.swiper-scrollbar'
					},
					// 显示几个图
					slidesPerView: 3,
					// 每一次切换图片的个数
					slidesPerGroup: 1
				});
			});
		}
	},
	methods: {
		// 点击修改坐标,小图点击有类名
		changeCurrcentIndex(index) {
			this.currcentIndex = index;
			// 通知放大镜展示,索引值为己
			this.$bus.$emit('getIndex', this.currcentIndex);
		}
	}
};
</script>

<style lang="less" scoped>
.swiper-container {
	height: 56px;
	width: 412px;
	box-sizing: border-box;
	padding: 0 12px;

	.swiper-slide {
		width: 56px;
		height: 56px;

		img {
			width: 100%;
			height: 100%;
			border: 1px solid #ccc;
			padding: 2px;
			width: 50px;
			height: 50px;
			display: block;

			&.active {
				border: 2px solid #f60;
				padding: 1px;
			}
		}
	}

	.swiper-button-next {
		left: auto;
		right: 0;
	}

	.swiper-button-prev {
		left: 0;
		right: auto;
	}

	.swiper-button-next,
	.swiper-button-prev {
		box-sizing: border-box;
		width: 12px;
		height: 56px;
		background: rgb(235, 235, 235);
		border: 1px solid rgb(204, 204, 204);
		top: 0;
		margin-top: 0;
		&::after {
			font-size: 12px;
		}
	}
}
</style>
