import Moment from "moment";

const DATE_FORMAT = "DD MMM yyyy hh:mm";

class DateUtils {

    static formatDate(date, format=DATE_FORMAT) {
        return Moment(date).format(format)
    }

    static formatMilliseconds(milliseconds) {
        if (!milliseconds) return "";
        if (milliseconds < 0) milliseconds = -milliseconds;
        const time = {
          day: Math.floor(milliseconds / 86400000),
          hour: Math.floor(milliseconds / 3600000) % 24,
          minute: Math.floor(milliseconds / 60000) % 60,
          second: Math.floor(milliseconds / 1000) % 60
        };
        return Object.entries(time)
          .filter(val => val[1] !== 0)
          .map(val => val[1] + ' ' + (val[1] !== 1 ? val[0] + 's' : val[0]))
          .join(', ');
    };
}

export default DateUtils;