import NavigationBar from "../components/NavigationBar";
import Systems from "../components/core/Systems";
import Incidents from "../components/core/Incidents";
import NoIncidents from "../components/core/NoIncidents";
import PageStatus from "../components/core/PageStatus";

export default function Home({config, systems, incidents, panels, navigation}) {
    return (
        <>
            <NavigationBar navigation={navigation} />
            {/*<img className="img-fluid" src="https://user-images.githubusercontent.com/19292210/60553863-044dd200-9cea-11e9-987e-7db84449f215.png" />*/}

            <main className="container mt-3" style={{maxWidth: 1012 +"px"}}>

                <section className="container" id="main">

                    <PageStatus panels={panels} />

                    <h2 className="mt-2">Systems</h2>
                    <Systems systems={systems} />

                    <h2 className="my-4">Incidents</h2>
                    <Incidents incidents={incidents} />

                    <NoIncidents incidents={incidents} />
                </section>

                <footer className="footer">
                    <section className="container">
                        <hr/>
                        <p>{config.footer}</p>
                    </section>
                </footer>

            </main>
        </>
    )
}

var groupBy = function (arr, criteria) {
    return arr.reduce(function (obj, item) {

        // Check if the criteria is a function to run on the item or a property of it
        var key = typeof criteria === 'function' ? criteria(item) : item[criteria];

        // If the key doesn't exist yet, create it
        if (!obj.hasOwnProperty(key)) {
            obj[key] = [];
        }

        // Push the value to the object
        obj[key].push(item);

        // Return the object to the next item in the loop
        return obj;

    }, {});
};

export const getStaticProps = async () => {

    const config = require("../config");

    const Provider = require(`../src/${config.provider.name}`);
    const provider = new Provider(config.provider.config);

    const systems = await provider.getSystems();
    const incidents = await provider.getIncidents();

    const panels = groupBy(systems.filter(s => s.status.name !== "operational"), (system) => {
        return system.status.name;
    })

    return {
        props: {
            config: {
                title: "Statuspage",
                logo: "https://raw.githubusercontent.com/jayfk/statuspage/master/template/favicon.png",
                favicon: "https://raw.githubusercontent.com/jayfk/statuspage/master/template/favicon.png",
                footer: "blabla"
            },
            navigation: {
                links: [
                    [{
                        name: "Help",
                        url: "https://www.google.com"
                    },{
                        name: "Community",
                        url: "https://www.google.nl"
                    },{
                        name: "Status",
                        url: "#"
                    }],
                    [{
                        name: "Logo",
                        image: "https://raw.githubusercontent.com/jayfk/statuspage/master/template/favicon.png",
                        url: "/"
                    }],
                    [{
                        name: "Github",
                        url: "https://github.com/leroy0211/statuspage"
                    },{
                        name: "Twitter",
                        url: "https://twitter.com"
                    },{
                        name: "Subscribe",
                        url: "#subscribe"
                    }]
                ]
            },
            systems,
            incidents,
            panels
        }
    }
}
