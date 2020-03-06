export const capitalize = str => {
  const sArr = str
    .split("")
    .slice(1, str.length)
    .join("");
  const first = str.charAt(0).toUpperCase();
  return first + sArr;
};
