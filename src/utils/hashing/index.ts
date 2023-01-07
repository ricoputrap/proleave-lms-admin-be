/**
 * Generate a hash number based on a string
 * @param {string} str a string that will be used for generating a hash number
 * @returns {number} a hash number
 */
export const stringToHash = (str: string): number => {
  let hash = 0;
  if (str.length == 0) return hash;

  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return hash;
}