class ReposClass {
	static username = "fighterdesigner";

	static async getUser() {
		const repos = await fetch(
			`https://api.github.com/users/${this.username}/repos`
		)
			.then((data) => data.json())
			.then((res) => res)
			.catch((err) => console.log(err));

		const { login, avatar_url } = repos[0].owner;

		let userAndRepos = {};
		userAndRepos.username = login;
		userAndRepos.useravatar = avatar_url;

		let reposNames = [];

		for (const repo of repos) {
			reposNames.push(repo.name);
		}

		userAndRepos.repos = reposNames;

		return userAndRepos;
	}

	static async getBranches(reponame) {
		const branches = await fetch(
			`https://api.github.com/repos/${this.username}/${reponame}/branches`
		)
			.then((data) => data.json())
			.then((res) => res)
			.catch((err) => console.log(err));

		return branches;
	}

	static async getBrancheCommits(branchname, reponame, allbranches) {

		const branche = allbranches.filter((branche) => {
			return branche.name === branchname;
		});

		const sha = branche[0].commit.sha;

		const brancheCommits = await fetch(
			`https://api.github.com/repos/${this.username}/${reponame}/commits?sha=${sha}`
		)
			.then((data) => data.json())
			.then((res) => res)
			.catch((err) => console.log(err));

		const commits = brancheCommits
			.map((commit) => {
				const {
					commit: {
						committer: { name, date },
						message,
					},
					committer: { avatar_url },
				} = commit;

				return {
					name,
					date: new Date(date).toDateString(),
					time: new Date(date).toLocaleTimeString(),
					message,
					avatar_url,
				};
			})
			.sort((commit1, commit2) => {
				return new Date(commit2.date) - new Date(commit1.date);
			});

		const GroupeBydate = this.GroupeBydate(commits, "date");

		let arrayOfCommits = [];

		for (const commit of GroupeBydate) {
			let initObject = {};

			initObject.commits = commit;

			const entries = Object.entries(initObject.commits[0]);
			const date_array = new Map([entries[1]]);
			const date = Object.fromEntries(date_array);

			const merger = { ...date, ...initObject };

			arrayOfCommits.push(merger);
		}

		return arrayOfCommits
	}

	static GroupeBydate(commits, property) {
		var val,
			index,
			values = [],
			result = [];
		for (const commit of commits) {
			val = commit[property];
			index = values.indexOf(val);
			if (index > -1) result[index].push(commit);
			else {
				values.push(val);
				result.push([commit]);
			}
		}
		return result;
	}
}

export default ReposClass;
