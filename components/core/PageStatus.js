import {getColor} from "../status/Severity";

const Status = ({children, className, icon, ...props}) => (
    <div {...{className: "card text-white px-3 py-2 my-4 " + className , ...props}}>
        <strong>
            <span className="mr-2">{icon}</span>
            <span>
                {children}
            </span>
        </strong>
    </div>
)

const PageStatus = ({panels}) => {
    if (Object.keys(panels).length === 0) {
        return (
            <Status icon="✓" className="bg-success">
                All Systems Operational
            </Status>
        );
    }

    return (
        <>
            {Object.keys(panels).map(status => {
                return (
                    <Status
                        icon={status.name === "operational" ? "✓" : "!"}
                        style={{
                        backgroundColor: getColor(panels[status][0].status.color),
                        fontSize: 1.2 + "rem"
                    }}>
                        {status} on {panels[status].map(p => p.name).join(",")}.
                    </Status>
                )
            })}
        </>
    )
}

export default PageStatus;
