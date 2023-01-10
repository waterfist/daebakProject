import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDS59ebs_vteAvZfUDv6pAB83ebibOX604',
  authDomain: 'rn-teamproject.firebaseapp.com',
  projectId: 'rn-teamproject',
  storageBucket: 'rn-teamproject.appspot.com',
  messagingSenderId: '1005847091124',
  appId: '1:1005847091124:web:b9e66042ee1dbcf991c4e1',
};

const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
