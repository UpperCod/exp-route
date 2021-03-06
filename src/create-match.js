import { pathToRegExp } from "./path-to-regexp.js";
import { getParts } from "./search-params.js";
/**
 *
 * @param {string} regPath
 */
export function createMatch(regPath) {
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
