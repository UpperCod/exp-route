/**
 *
 * @param {string} path
 */
export const getParts = (path) => path.split(/(\?.*)/);
/**
 * @param {string} search
 * @param {Object} [props]
 */
export function searchParams(search, props = {}) {
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
