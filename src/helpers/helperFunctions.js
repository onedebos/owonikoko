export const capitalize = str => {
  const sArr = str
    .split("")
    .slice(1, str.length)
    .join("");
  const first = str.charAt(0).toUpperCase();
  return first + sArr;
};

export const showPasswordToggler = () => {
  const passwordField = document.getElementById("password");
  if (passwordField.type === "text") {
    passwordField.type = "password";
  } else {
    passwordField.type = "text";
  }
};
