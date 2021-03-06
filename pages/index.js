import marked from "marked";
import {useRef} from "react";
import Parser from "html-react-parser";
import Severity, {SeverityBadge} from "../components/status/Severity";
import Localize from "../components/Localize";

export const useLoadScripts = (scripts) => {
    const scriptsLoaded = useRef(false);
    if (typeof window !== "undefined" && !scriptsLoaded.current) {
        scripts.forEach((script) => {
            const element = document.createElement(script.tagName || "script");
            const props = script.props || {src: script, type: "text/javascript"}
            Object.keys(props).forEach(prop => {
                element[prop] = props[prop]
            })
            const position = document.querySelector("head");
            position.appendChild(element);
        });
        scriptsLoaded.current = true;
    }
};

export default function Home({config, systems, incidents}) {
    useLoadScripts([
        {
            tagName: "link",
            props: {
                rel: "prefetch",
                href: "translations.ini",
                type: "application/l10n"
            }
        },
        "//cdn.jsdelivr.net/npm/webl10n@1.0.0/l10n.min.js",
    ]);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src={config.logo} alt="" height="24" className="d-inline-block align-top"/>
                        {config.title}
                    </a>
                </div>
            </nav>

            <main className="container" style={{maxWidth: 50 + "rem"}}>

                <section className="container" id="main">
                    <div className="card bg-success text-white p-3 mb-3">
                        <strong>All Systems Operational</strong>
                    </div>
                    <div className="card bg-warning text-white p-3 mb-3 text-bold">
                        <strong>Degraded performance on System 1, System 2.</strong>
                    </div>

                    <Localize as="h2" className="mt-2">Systems</Localize>
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            {systems.map(system => (
                                <li className="list-group-item">
                                    {system.name}
                                    <Severity className="float-right" color={system.status.color}>{system.status.name}</Severity>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Localize as="h2" className="my-4">Incidents</Localize>

                    {incidents.map(incident => (
                        <div className="incident">
                            <span className="date">{ incident.created }</span>
                            {incident.systems.map(system => (
                                <span className="badge bg-dark text-white float-right ml-1">{ system.name }</span>
                            ))}
                            {incident.closed && (
                                <SeverityBadge color="green">
                                    resolved
                                </SeverityBadge>
                            )}
                            {!incident.closed && (
                                <SeverityBadge color={incident.severity.color}>
                                    { incident.severity.name }
                                </SeverityBadge>
                            )}
                            <hr/>
                            <div className="title">{ incident.title }</div>
                            <p>{ Parser(marked(incident.body)) }</p>

                            {incident.updates.map(update => (
                                <>
                                    <p><em>Update {update.created}</em></p>
                                    <p>{Parser(marked(update.body))}</p>
                                </>
                            ))}
                        </div>
                    ))}

                    {incidents.length === 0 && (
                        <em data-l10n-id="no-incidents">No incidents in the past 90 days.</em>
                    )}

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

export const getStaticProps = async () => {

    const config = require("../config");

    const Provider = require(`../src/${config.provider.name}`);
    const provider = new Provider(config.provider.config);

    return {
        props: {
            config: {
                title: "Statuspage",
                logo: "https://raw.githubusercontent.com/jayfk/statuspage/master/template/favicon.png",
                favicon: "https://raw.githubusercontent.com/jayfk/statuspage/master/template/favicon.png",
                footer: "blabla"
            },
            systems: await provider.getSystems(),
            incidents: await provider.getIncidents()
        }
    }
}
