const HASH = "(?:(?:/){0,1}#(?:/){0,1})";
const SLASH = "(?:/)";
/**
 *
 * @param {string} path
 * @return {[RegExp,string[]]}
 */
export function pathToRegExp(path) {
    const params = [];
    const regFolders = path
        .replace(/#(\/){0,1}/, "/#")
        .split(/\//g)
        .map((folder) => {
            if (!folder) return "";
            const [, hash = "", type, spread, param] = folder.match(
                /(#){0,1}([\{\[]){0,1}(\.\.\.){0,1}(\w*)([\}\]]){0,1}/
            );
            if (type == "{" || type == "[") {
                params.push(param);
                const wildcard = type == "[" ? "*" : "+";
                const slash =
                    (hash ? HASH : SLASH) + (type == "[" ? "{0,1}" : "{1}");
                return spread
                    ? `${slash}(.${wildcard})`
                    : `${slash}([^\/#]${wildcard})`;
            } else {
                return (
                    (hash ? HASH : "/") +
                    ignore(hash ? folder.slice(1) : folder)
                );
            }
        })
        .join("");
    // Hash paths escape the path start requirement
    const isHash = !regFolders.indexOf(HASH);
    return [
        RegExp(
            (isHash ? "" : "^") +
                (regFolders || SLASH + "{0,1}") +
                // closed paths are only enabled out of hash
                (!isHash && path != "/" && path.endsWith("/") ? "/" : "") +
                "$"
        ),
        params,
    ];
}

/**
 *
 * @param {string} str
 */
export const ignore = (str) => str.replace(/([.+^()\-:])/g, "\\$1");
