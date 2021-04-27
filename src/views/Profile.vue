<template>
	<div class="profile mb-5">
		<div class="container">
			<div class="row justify-content-end align-items-center py-4">
				<p class="mb-0 mr-3 h5 text-muted">{{ username }}</p>
				<div class="profile-img rounded-circle overflow-hidden border">
					<img :src="useravatar" />
				</div>
			</div>
			<div class="row px-3 align-items-start">
				<div class="col-12 col-md-3">
					<input
						class="form-control"
						type="text"
						placeholder="Search for repos ..."
						@input="autoComplete()"
						v-model="typed"
					/>
					<ul class="list-group mt-3">
						<li
							v-for="reponame in reposnames"
							:key="reponame"
							class="list-group-item list-group-item-action"
							@click="fillInput(reponame)"
						>
							{{ reponame }}
						</li>
					</ul>
				</div>
				<div class="col-12 col-md-9 card">
					<branche-selector
						:repo-name="reponameprops"
					></branche-selector>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ReposClass from "../ReposClass";
import BrancheSelector from "../components/BrancheSelector";

export default {
	name: "Profile",
	components: {
		BrancheSelector,
	},
	data() {
		return {
			username: "",
			useravatar: "",
			reposnames: [],
			reposHolder: [],
			typed: "",
			reponameprops: "",
		};
	},
	methods: {
		async getUser() {
			const userAndRepos = await ReposClass.getUser();

			this.username = userAndRepos.username;
			this.useravatar = userAndRepos.useravatar;
			this.reposHolder = userAndRepos.repos;
		},
		autoComplete() {
			this.reposnames = this.reposHolder.filter((reponame) => {
				return reponame
					.toLowerCase()
					.startsWith(this.typed.toLowerCase());
			});

			if (this.typed === "") {
				this.reposnames = [];
			}
		},
		fillInput(reponame) {
			this.typed = reponame;
			this.reponameprops = this.typed;
			this.reposnames = [];
		},
	},
	created() {
		this.getUser();
	},
};
</script>

<style scoped lang="scss">
.profile-img {
	width: 40px;
	height: 40px;

	img {
		width: 100%;
		height: 100%;
		object-fill: cover;
	}
}
.list-group-item {
	cursor: pointer;
}
</style>
