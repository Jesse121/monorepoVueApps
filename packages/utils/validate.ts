/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
	return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string) {
	return /^[0-9a-zA-Z_]{1,}$/.test(str);
}
