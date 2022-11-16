/**
 * Resolves URI by parts and removes duplicated slashes.
 *
 * @param {string} part
 * @returns {string}
 */
export default (...parts) => parts
    .join('/')
    .replace(/[/]{2,}/g, '/');
