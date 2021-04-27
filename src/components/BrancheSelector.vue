<template>
	<div class="branches">
		<div class="column">
			<div
				class="col-12 row align-items-center h5 m-0 py-4"
				v-if="repoName"
			>
				<i class="fab fa-github"></i>
				<p class="m-0 pl-3">{{ repoName }}</p>
			</div>
			<div class="col-12 selector position-relative">
				<select v-model="selectedBranches" class="btn border pl-4">
					<option
						v-for="(branche, index) in branchesNames"
						:key="index"
						>{{ branche.name }}</option
					>
				</select>
			</div>
			<commits-list
				:all-branches="branchesNames"
				:branch-name="selectedBranches"
				:repo-name="repoName"
			></commits-list>
		</div>
	</div>
</template>

<script>
import ReposClass from "../ReposClass";
import CommitsList from "../components/CommitsList";

export default {
	name: "branches",
	components: {
		CommitsList,
	},
	data() {
		return {
			branchesNames: [],
			selectedBranches: "",
		};
	},
	props: {
		repoName: String,
	},
	methods: {
		async getBranches(reponame) {
			const branches = await ReposClass.getBranches(reponame);

			this.branchesNames = branches;

			if (this.branchesNames)
				this.selectedBranches = this.branchesNames[0].name;
		},
	},
	watch: {
		repoName: function() {
			this.getBranches(this.repoName);
		},
	},
};
</script>
<style>
.selector:before {
	content: "\f126";
	font-family: "Font Awesome\ 5 Free";
	font-weight: 900;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 27px;
}
</style>
