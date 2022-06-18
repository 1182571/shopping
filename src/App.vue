<template>
	<div>
		<Header></Header>
		<router-view></router-view>
		<!-- 在home,search下是显示的 在登录注册是隐藏的 -->
		<Footer v-show="$route.meta.show"></Footer>
	</div>
</template>
<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
	name: 'App',
	components: { Header, Footer },
	mounted() {
		// 通知Vuex发请求,获取数据存储到仓库当中  放这里只会执行一次 切换组件的时候不会一直请求
		this.$store.dispatch('categoryList');
	}
};
</script>

<style></style>
