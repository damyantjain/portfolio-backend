import CryptoJS from "crypto-js";

export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, process.env.CIPHER_KEY).toString();
};

export const decrypt = (data) => {
  return CryptoJS.AES.decrypt(data, process.env.CIPHER_KEY).toString(
    CryptoJS.enc.Utf8
  );
};