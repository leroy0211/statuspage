import {SeverityBadge} from "../status/Severity";
import Parser from "html-react-parser";
import marked from "marked";

const Incidents = ({incidents}) => (
    <>
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
    </>
);
export default Incidents;
