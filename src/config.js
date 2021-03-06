const COLORED_LABELS = {
    "1192FC": "investigating",
    "FFA500": "degraded performance",
    "FF4D4D": "major outage"
}

const STATUSES = Object.values(COLORED_LABELS);

const SYSTEM_LABEL_COLOR = '171717';
const OPERATIONAL_COLOR = '28a745';

const DEFAULT_CONFIG = {
    "footer": "Status page hosted by GitHub, generated with <a href='https://github.com/leroy0211/statuspage'>leroy0211/statuspage</a>",
    "logo": "https://raw.githubusercontent.com/jayfk/statuspage/master/template/logo.png",
    "title": "Status",
    "favicon": "https://raw.githubusercontent.com/jayfk/statuspage/master/template/favicon.png"
}

module.exports = {
    COLORED_LABELS,
    STATUSES,
    SYSTEM_LABEL_COLOR,
    OPERATIONAL_COLOR,
    DEFAULT_CONFIG
}
