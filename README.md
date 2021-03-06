# Statuspage using data providers

This project contains a statuspage implementation using NextJS. 
Supports multiple data providers and can be hosted statically and dynamically.

Demo: https://leroy0211.github.io/statuspage/

## Data providers

This projects comes packaged with a few data providers:

### Static json files

provider: `static`

```js
# config.js
module.exports = {
    provider: {
        name: "static",
        config: {
            systems: require("./systems.json"),
            incidents: require("./incidents.json")
        }
    }
}
```

### Github issues

provider: `github`

This provider uses issues, labels, and issue comments to generate the statuspage. 

Every system is a label using label color: `171717`
Every severity is a label using the following colors: 

* `1192FC` (blue) - investigating
* `FFA500` (orange) - degraded performance
* `FF4D4D` (red) - major outage

Every issue using at least one system label and one severity label is an incident. 
All comments per issue, are considered incident updates.

Incidents are displayed for 90 days. After 90 days, incidents are removed. 
When using static hosting, you need to build and deploy at least every day, otherwise incidents are never removed.

```js
# config.js
module.exports = {
    provider: {
        name: "github",
        config: {
            owner: "owner",
            repo: "repository"
        }
    }
}
```

## Host

You can host it dynamically or statically. 

Static hosting
```bash
yarn install 
yarn build
yarn next export  # your static site is available in the /out directory
```

Tip! You can use github pages and github workflow to serve your static status page. Take a look in `/.github/workflows/main.yml` for an example.

Dynamic hosting
```bash
yarn install 
yarn build
yarn start # a webserver will be started, serving the application
```

Development hosting (for local development)
```bash
yarn install 
yarn dev  # a development webserver will be started
```
