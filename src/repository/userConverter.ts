import firebase from 'firebase/compat/app';
import { User } from "../interfaces/User";

export const UserConverter = {
  toFirestore: (user: User) => user,
  fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, 
    options: firebase.firestore.SnapshotOptions) => snapshot.data() as User
}
