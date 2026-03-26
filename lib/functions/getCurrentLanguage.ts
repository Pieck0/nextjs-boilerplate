export const getCurrentLanguage = () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("locale="));
  if (cookie) {
    return cookie.split("=")[1];
  }
  return process.env.DEFAULT_LANG || "pl";
};
