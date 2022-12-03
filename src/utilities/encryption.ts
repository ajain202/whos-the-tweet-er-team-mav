import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

function encryptData(val: string) {
  const encrypted = AES.encrypt(val, process.env.REACT_APP_ENCRYPTION_KEY || '').toString();
  return encrypted;
}

function decryptData(val: string) {
  const decrypted = AES.decrypt(val, process.env.REACT_APP_ENCRYPTION_KEY || '').toString(enc);
  return decrypted;
}

export { encryptData, decryptData };
