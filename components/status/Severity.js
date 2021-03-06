function isHexColor (hex) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex))
}

const Severity = ({children, color, ...props}) => {
    color = isHexColor(color) ? `#${color}` : color;

    return (
        <span {...{
            style: {
                ...props.style,
                color
            },
            ...props
        }}>{children}</span>
    )
};

export const SeverityBadge = ({children, color, ...props}) => {
    color = isHexColor(color) ? `#${color}` : color;

    return (
        <span {...{
            style: {
                ...props.style,
                backgroundColor: color
            },
            ...props
        }} className="badge text-white float-right ml-1">
            { children }
        </span>
    )
}

export default Severity;
