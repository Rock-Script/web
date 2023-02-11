import * as _ from "lodash";

class StringUtils {
    static getInitials(str) {
        if (!str) return "";
        return str.split(" ").map(a => a.charAt(0)).join("");
    }

    static capitalize(str) {
        if (!str) return "";
        return _.capitalize(str);
    }
}

export default StringUtils;