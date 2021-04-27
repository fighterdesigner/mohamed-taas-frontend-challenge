<template>
	<div class="commits overflow-scroll py-5">
		<div class="column commits-container p-3">
			<div class="border-left m-0 py-4" v-for="(commit, index) in allCommits" :key="index">
				<p class="h5 date"><i class="fas fa-dot-circle mr-3 py-1 bg-white"></i>{{commit.date}}</p>
				<div class="ml-5 my-3 card border-bottom-0">
					<div class="border-bottom p-3" v-for="(singlecommit, i) in commit.commits" :key="i">
						<h5>{{singlecommit.message}}</h5>
						<div class="row pl-3 align-items-center">
						<div class="avatar m-0 rounded-circle overflow-hidden">
							<img class="w-100 h-100" :src="singlecommit.avatar_url">
						</div>
						<p class="m-0">{{singlecommit.name}}</p>
						<p class="mb-0 ml-4 text-muted">at: {{singlecommit.time}}</p>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ReposClass from "../ReposClass";

export default {
	name: "commitsList",
	props: {
		branchName: String,
		repoName: String,
		allBranches: Array,
	},
	data() {
		return {
			allCommits: []
		};
	},
	methods: {
		async selectedBranche(branchName, repoName, allBranches) {
			const array = await ReposClass.getBrancheCommits(
				branchName,
				repoName,
				allBranches
			);
			

			this.allCommits = array
		},
	},
	watch: {
		allBranches() {
				this.selectedBranche(
					this.branchName,
					this.repoName,
					this.allBranches
				);
		},
		branchName() {
			this.selectedBranche(
					this.branchName,
					this.repoName,
					this.allBranches
				);
		}
	},
};
</script>
<style lang="scss">
	.avatar {
		width: 40px;
		height: 40px;
		img {
			object-fit: cover;
		}
	}
	.date {
		transform: translateX(-10px)
	}
	.commits {
		height: 400px
	}
	.commits-container {
		height: 100%;
		overflow-y: scroll
	}
	.commits-container::-webkit-scrollbar {
		display: none
	}
</style>
