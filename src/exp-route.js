export * from "./create-match.js";
export * from "./search-params.js";

/**
 * @typedef {Record<string,string>} Params
 */

/**
 * @template {Params} T
 * @typedef { (path:string)=>T|undefined} Match
 */
