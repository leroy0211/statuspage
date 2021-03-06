import {getColor} from "../status/Severity";

const Systems = ({systems}) => (
    <div className="card-grid">
        {systems.map(system => (
            <div className="card rounded-0">
                <div className="card-body">
                    <span className="card-title">{system.name}</span>

                    <span className="status float-right" style={{backgroundColor: getColor(system.status.color)}}>
                        {system.status.name === "operational" ? "✓" : "!"}
                    </span>

                    <p className="card-text">
                        <small className="text-muted">
                            {system.status.name}
                        </small>
                    </p>
                </div>
            </div>
        ))}
    </div>
)

export default Systems;
