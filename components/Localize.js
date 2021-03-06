import React from 'react';

const Localize = ({children, as, ...props}) => {
    let dataL10nId = false;
    if (typeof children === "string") {
        dataL10nId = children.toLowerCase().replace(" ", "-");
    }
    return React.createElement(as, {
        ...props,
        children,
        "data-l10n-id": dataL10nId
    });
}

export default Localize;
