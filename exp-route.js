/**
 *
 * @param {string} str
 */
const ignore = (str) => str.replace(/([.+^()\-:])/g, "\\$1");
/**
 *
 * @param {string} path
 * @return {[RegExp,string[]]}
 */
function pathToRegExp(path) {
    const params = [];
    const regFolders = path.split(/\//g).map((folder) => {
        if (!folder) return "";
        const [, type, spread, param] = folder.match(
            /([\{\[]){0,1}(\.\.\.){0,1}(\w+)([\}\]]){0,1}/
        );
        if (type == "{" || type == "[") {
            params.push(param);
            const wildcard = type == "[" ? "*" : "+";
            const slash = "(?:/)" + (type == "[" ? "{0,1}" : "{1}");
            return spread
                ? `${slash}(.${wildcard})`
                : `${slash}([^\/]${wildcard})`;
        } else {
            return "/" + ignore(folder);
        }
    });
    return [RegExp("^" + regFolders.join("") + "$"), params];
}

/**
 *
 * @param {string} path
 */
const getParts = (path) => path.split(/(\?.*)/);
/**
 * @param {string} search
 * @param {Object} [props]
 */
function searchParams(search, props = {}) {
    search.replace(
        /(?:\?|&){1}([^=&]+)(?:=([^\?&]+)){0,1}/g,
        /**
         * @param {string} _
         * @param {string} index
         * @param {string} value
         */
        (_, index, value) => {
            props[index] = value;
            return "";
        }
    );
    return props;
}

/**
 *
 * @param {string} regPath
 */
function createMatch(regPath) {
    const [path] = getParts(regPath);
    const [testPath, paramsPath] = pathToRegExp(path);
    /**
     * @param {string} request
     */
    const match = (request) => {
        const [path] = getParts(request);
        const test = path.match(testPath);
        if (test) {
            const [, ...args] = test;
            const query = {};
            return args.reduce((p, value, index) => {
                p[paramsPath[index]] = value;
                return p;
            }, query);
        }
    };
    return match;
}

export { createMatch, getParts, searchParams };
//# sourceMappingURL=exp-route.js.map
