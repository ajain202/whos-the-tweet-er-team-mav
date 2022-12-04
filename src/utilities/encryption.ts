import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';
import { doc, getDoc } from 'firebase/firestore';
import { firestoreDB } from '../firebase/firebase-client';

function encryptData(val: string, userSecret: string) {
  const encrypted = AES.encrypt(val, userSecret).toString();
  return encrypted;
}

function decryptData(val: string, uid: string): Promise<string> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      if (val && uid) {
        const userSecretRef = doc(firestoreDB, 'userSecrets', uid);
        const docsnap = await getDoc(userSecretRef);
        const userSecret = docsnap.data()?.secret as string;
        const decrypted = AES.decrypt(val, userSecret).toString(enc);
        resolve(decrypted);
      } else {
        resolve('{}');
      }
    } catch (_error) {
      reject(_error);
    }
  });
}

export { encryptData, decryptData };
