import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Firestore

export const registerUser = async (email, password, userInfo) => {
  try {
    // Crea el usuario
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guarda la información del usuario en Firestore
    const db = getFirestore();
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      ...userInfo, // Agrega cualquier otra información del usuario
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
