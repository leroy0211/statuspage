const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
    auth: process.env.TOKEN
});

const {
    get_systems,
    get_incidents,
    get_updates
} = require("./utils");

class Github {
    constructor({owner, repo}) {
        this.owner = owner;
        this.repo = repo;
    }

    getSystems = async () => {
        const {data: issues} = await octokit.issues.listForRepo({
            owner: this.owner,
            repo: this.repo,
        });
        const {data: labels} = await octokit.issues.listLabelsForRepo({
            owner: this.owner,
            repo: this.repo,
        });
        return get_systems(labels, issues);
    }

    getIncidents = async () => {
        const {data: issues} = await octokit.issues.listForRepo({
            owner: this.owner,
            repo: this.repo,
            state: "all",
            sort: "created",
            direction: "desc",
            since: new Date(new Date().setDate(new Date().getDate() + -90)).toISOString()
        });

        const commentsPromise = (issue) => octokit.issues.listComments({
            owner: this.owner,
            repo: this.repo,
            issue_number: issue
        });

        const incidents = get_incidents(issues);


        return Promise.all(incidents.map(async (incident) => {
            const {data: comments} = await commentsPromise(incident.id);

            return {
                ...incident,
                updates: get_updates(comments)
            }
        }));
    }
}

module.exports = Github;
