const moment = require("moment-timezone");

global.Date = (format = undefined, tz = undefined) => {
    if(format === undefined) {
        return moment().tz(tz || defaultTimezone);
    } else {
        return moment().tz(tz || defaultTimezone).format(format);
    }
};