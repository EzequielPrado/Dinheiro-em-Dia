import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { User } from '../interfaces/User';
import { UserConverter } from './userConverter';

const firebaseConfig = {
  apiKey: "AIzaSyDrzEqM5pDEsfaHdd9mAZqkhNDxlYLZyBw",
  authDomain: "storks-1df42.firebaseapp.com",
  projectId: "storks-1df42",
  storageBucket: "storks-1df42.appspot.com",
  messagingSenderId: "958544288953",
  appId: "1:958544288953:web:106e3378a497b3f20a0f68",
  measurementId: "G-X9SN1ZY9BR"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export const addUser = async (user: User): Promise<boolean> => {
  const users = firestore.collection('users');
  const existingUser = await users.where('email', '==', user.email).get();
  if (existingUser.empty) {
    users.add(user);
    return true;
  }

  return false;
}

export const getUser = async (email: string, password: string): Promise<User | undefined> => {  
  const users = firestore.collection('users').withConverter(UserConverter);
  const existingUser = await users.where('email', '==', email).where('password', '==', password).get();
  if (existingUser.empty) return undefined;

  const data = existingUser.docs[0].data();
  return data;
}

export const updateUser = async (user: User, ): Promise<boolean> => {
  const users = firestore.collection('users');
  const existingUser = await users.where('email', '==', user.email).get();
  if (existingUser.empty) return false;

  const doc = existingUser.docs[0];
  users.doc(doc.id).set(user);
  
  return true;
}
