import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const storageRef = path => ref(storage, path);

export const getReferencedDownloadURL = async path => {
    try {
        const $ref = storageRef(path);
        const url = await getDownloadURL($ref);
        return url;
    } catch (error) {
        console.error(error);
        return null;
    }
};
