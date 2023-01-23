
class StringUtils {
    static getInitials(str) {
        if (!str) return "";
        return str.split(" ").map(a => a.charAt(0)).join("");
    }
}

export default StringUtils;