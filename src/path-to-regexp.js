/**
 *
 * @param {string} path
 * @return {[RegExp,string[]]}
 */
export function pathToRegExp(path) {
    const params = [];
    const regFolders = path.split(/\//g).map((folder) => {
        if (!folder) return "";
        const [, hash = "", type, spread, param] = folder.match(
            /(#){0,1}([\{\[]){0,1}(\.\.\.){0,1}(\w+)([\}\]]){0,1}/
        );
        if (type == "{" || type == "[") {
            params.push(param);
            const wildcard = type == "[" ? "*" : "+";
            const slash =
                (hash ? "(?:/#|#)" : "(?:/)") + (type == "[" ? "{0,1}" : "{1}");
            return spread
                ? `${slash}(.${wildcard})`
                : `${slash}([^\/#]${wildcard})`;
        } else {
            return (folder[0] == "#" ? "(?:/#|#)" : "/") + ignore(folder);
        }
    });
    return [RegExp("^" + (regFolders.join("") || "(?:/){0,1}") + "$"), params];
}

/**
 *
 * @param {string} str
 */
export const ignore = (str) => str.replace(/([.+^()\-:])/g, "\\$1");
