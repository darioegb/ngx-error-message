const octetPattern = '(25[0-5]|2[0-4]\\d|1\\d{2}|\\d{1,2})'
const countryCode = '\\+?[-.\\s]?\\d{1,2}[-.\\s]?'
const areaCode = '\\(?\\d{3}\\)?'
const phoneNumber = '\\d{3}[-.\\s]?\\d{4}'
const protocol = '(https?:\\/\\/)?'
const domain = '[\\w\\d-]+(\\.[\\w\\d-]+)+'
const path = '(\\/[-\\w\\d.]*)*\\/?'
const query = '(\\?[\\w\\d=&]*)?'
const fragment = '(#[\\w\\d-]*)?'

export const regEx = {
  phoneNumber: new RegExp(
    `^(${countryCode})?${areaCode}[-.\\s]?${phoneNumber}$`,
  ),
  websiteUrl: new RegExp(`^${protocol}${domain}${path}${query}${fragment}$`),
  numeric: /^\d+$/,
  smallLetters: /^[a-z]+$/,
  capitalLetters: /^[A-Z]+$/,
  alphabet: /^[a-zA-Z\s\u00C0-\u017F]+$/,
  alphaNumeric: /^[a-zA-Z0-9\s\u00C0-\u017F]+$/,
  ip: new RegExp(`^(${octetPattern})(\\.(${octetPattern})){3}$`),
}

export const requiredRegex = /^((?!actual).)*$/
