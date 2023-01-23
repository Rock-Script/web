
class StringUtils {
    static getInitials(str) {
        return str.split(" ").map(a => a.charAt(0)).join("");
    }
}

export default StringUtils;