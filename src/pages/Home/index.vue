<template>
	<div>
		<!-- 三级联动注册为了全局组件,因此不需要引入了 -->
		<TypeNav></TypeNav>
		<ListContainer></ListContainer>
		<Recommend></Recommend>
		<Rank></Rank>
		<Like></Like>
		<!-- v-for也可以在自定义标签上使用  需要传给floor组件使用-->
		<Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
		<Brand></Brand>
	</div>
</template>

<script>
// 引入其余组件
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import { mapState } from 'vuex';
export default {
	name: 'Home',
	components: {
		ListContainer,
		Recommend,
		Rank,
		Like,
		Floor,
		Brand
	},
	// 在这里发floor数据getFloorlist,不能在floor组件发因为用了两次不能v-for,不能遍历
	mounted() {
		// 派发action 获取floor的数据
		this.$store.dispatch('getFloorlist');

	},
	computed: {
		...mapState({
			floorList: state => state.home.floorList
		})
	}
};
</script>

<style></style>
