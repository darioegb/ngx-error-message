
export const regEx = {
    phoneNumber: '(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})',
    websiteUrl: '^(https?:\/\/)?([\w\d-_]+)\.([\w\d-_\.]+)\/?\??([^#\n\r]*)?#?([^\n\r]*)',
    numeric: '^\d+$',
    smallLetters: '^[a-z]+$',
    capitalLetters: '^[A-Z]+$',
    alphabet: '^[a-zA-Z\s]+$',
    alphaNumeric: '^[a-zA-Z0-9\s]+$',
    ip: '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$'
};

export const requiredRegex = /^((?!actual).)*$/;

