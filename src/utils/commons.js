// constants
const {CONFIG_PROPS} = require("../configs/constants.js");

const calculateDirection = (angle) => {
    return CONFIG_PROPS.directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
}

const calculateDate = (value) => {
    return new Date(value * 1000).toLocaleString(CONFIG_PROPS.locale, CONFIG_PROPS.short_date_format);
}

module.exports = {
    calculateDirection,
    calculateDate
}