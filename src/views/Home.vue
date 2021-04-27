<template>
	<div class="home d-flex justify-content-center align-items-center">
		<router-link class="btn btn-primary" to="/profile"
			>Authorize my Github accoun</router-link
		>
	</div>
</template>

<script>
export default {
	name: "Home",
};
</script>
<style scoped>
.home {
	height: 100vh;
}
</style>
