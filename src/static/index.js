class Static {
    constructor(config) {
        this.systems = config.systems || [];
        this.incidents = config.incidents || [];
    }

    getSystems() {
        return this.systems;
    }
    getIncidents() {
        return this.incidents;
    }
}

module.exports = Static;
