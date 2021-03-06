const {
    SYSTEM_LABEL_COLOR,
    COLORED_LABELS,
    OPERATIONAL_COLOR
} = require("../config")

function fetchSystems(labels) {
    return labels.filter(label => label.color === SYSTEM_LABEL_COLOR);
}

function get_severity(labels) {
    const severities = labels.filter(label => ~Object.keys(COLORED_LABELS).indexOf(label.color));

    return severities.find(() => true) || null;
}

function get_systems(labels, issues) {

    let systems = fetchSystems(labels).map(system => {
        return {
            name: system.name,
            status: {name: "operational", color: OPERATIONAL_COLOR}
        }
    });

    for(const issueIndex in issues) {
        const issue = issues[issueIndex];
        if (issue.state === "open"){
            const severity = get_severity(issue.labels);
            const affected_systems = fetchSystems(issue.labels);

            for (const i in affected_systems) {
                systems.find(s => s.name === affected_systems[i].name).status = severity;
            }
        }
    }

    return systems;
}

function get_incidents(issues) {
    let incidents = [];

    for (const issueIndex in issues) {
        const issue = issues[issueIndex];
        const labels = issue.labels;
        const affected_systems = fetchSystems(labels);
        const severity = get_severity(labels);

        if (affected_systems.length === 0) {
            continue;
        }

        if (null === severity && issue.state !== "closed") {
            continue;
        }

        // @TODO: filter out collaborators

        const incident = {
            id: issue.number,
            created: issue.created_at,
            title: issue.title,
            systems: affected_systems,
            severity: severity,
            closed: issue.state === "closed",
            body: issue.body,
            updates: []
        }

        incidents.push(incident);
    }

    return incidents;
}

function get_updates(comments) {
    return comments.map(comment => ({
        created: comment.created_at,
        body: comment.body
    }));
}

module.exports = {
    get_systems,
    get_incidents,
    get_updates
}
