const NoIncidents = ({incidents}) => {
    if (incidents.length > 0) {
        return null;
    }
    return <em data-l10n-id="no-incidents">No incidents in the past 90 days.</em>
};

export default NoIncidents;
