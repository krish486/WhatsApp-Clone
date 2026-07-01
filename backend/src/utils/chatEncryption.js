const CryptoJS = require("crypto-js");

const SECRET_KEY = process.env.CHAT_SECRET_KEY;

const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
};

const decryptMessage = (encryptedMessage) => {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, SECRET_KEY);

    return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
    encryptMessage,
    decryptMessage,
};