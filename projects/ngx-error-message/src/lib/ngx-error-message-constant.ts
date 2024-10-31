export const regEx = {
  phoneNumber:
    /(\+?[-.\s]?\d{1,2}[-.\s]?)?(\(?\d{3}\)?|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}/,
  websiteUrl:
    /^(https?:\/\/)?([\w\d-]+)\.([\w\d.-]+)\/?[\w\d.-]*\??[^#\n\r]*#?[^#\n\r]*$/,
  numeric: /^\d+$/,
  smallLetters: /^[a-z]+$/,
  capitalLetters: /^[A-Z]+$/,
  alphabet: /^[a-zA-Z\s\u00C0-\u017F]+$/,
  alphaNumeric: /^[a-zA-Z0-9\s\u00C0-\u017F]+$/,
  ip: /^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})(\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})){3}$/,
}

export const requiredRegex = /^((?!actual).)*$/
