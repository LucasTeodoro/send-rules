const moment = require("moment-timezone");
const _ = require("lodash");
class Holydays {
   static _format = "YYYY-MM-DD";

    static _easterDate(y) {
        /*
            Easter Date Function for JavaScript implemented by Furgelnod ( https://furgelnod.com )
            Using algorithm published at The Date of Easter (on aa.usno.navy.mil, Oct 2007)
            (https://web.archive.org/web/20071015045929/http://aa.usno.navy.mil/faq/docs/easter.php)
            The algorithm is credited to J.-M. Oudin (1940) and is reprinted in the
            Explanatory Supplement to the Astronomical Almanac, ed. P. K. Seidelmann (1992).
            See Chapter 12, "Calendars", by L. E. Doggett.
        */
        try {
            y = Number(y);
            if (y != y) {
                throw new TypeError("Value must be a number.");
            } else if (y > 275760 || y < -271820) {
                throw new RangeError("Value be between -271820 and 275760 due to technical limitations of Date constructor.");
            }
        } catch (e) {
            console.error(e);
        }
        y = Math.floor(y);
        var c = Math.floor(y / 100);
        var n = y - 19 * Math.floor(y / 19);
        var k = Math.floor((c - 17) / 25);
        var i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * n + 15;
        i = i - 30 * Math.floor(i / 30);
        i = i - Math.floor(i / 28) * (1 - Math.floor(i / 28) * Math.floor(29 / (i + 1)) * Math.floor((21 - n) / 11));
        var j = y + Math.floor(y / 4) + i + 2 - c + Math.floor(c / 4);
        j = j - 7 * Math.floor(j / 7);
        var l = i - j;
        var m = 3 + Math.floor((l + 40) / 44);
        var d = l + 28 - 31 * Math.floor(m / 4);
        /*var z = new Date();
        z.setFullYear( y, m-1, d );*/
        return moment().tz(defaultTimezone).year(y).month(m-1).date(d);
    }
    static _holyDays() {
        const easter = Holydays._easterDate(Date("YYYY"));
        return [
            easter.format(Holydays._format),
            easter.subtract(2, 'days').format(Holydays._format),
            easter.subtract(47, 'days').format(Holydays._format),
            easter.add(60, "days").format(Holydays._format),
            Date().month("0").date("01").format(Holydays._format),
            Date().month("3").date("21").format(Holydays._format),
            Date().month("4").date("01").format(Holydays._format),
            Date().month("8").date("07").format(Holydays._format),
            Date().month("9").date("12").format(Holydays._format),
            Date().month("10").date("02").format(Holydays._format),
            Date().month("10").date("15").format(Holydays._format),
            Date().month("10").date("20").format(Holydays._format),
            Date().month("11").date("25").format(Holydays._format)
        ];
    }
    static isHolyDay(date) {
        if(moment(date).isValid()) {
            return _.indexOf(Holydays._holyDays(), date) !== -1;
        }

        throw new Error("Is not a valid date");
    }
}