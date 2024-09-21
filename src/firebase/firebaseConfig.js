import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'; // Asegúrate de importar Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAc0SbYsiuLFKfFRpkqqQ2NNwponv8_ubY",
  authDomain: "base-de-datos-5c071.firebaseapp.com",
  databaseURL: "https://base-de-datos-5c071-default-rtdb.firebaseio.com/",
  projectId: "base-de-datos-5c071",
  storageBucket: "base-de-datos-5c071.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa la autenticación
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Inicializa Firestore
const db = getFirestore(app); // Agrega esto

// Exporta la autenticación y la base de datos
export { auth, app, db }; // Asegúrate de exportar 'db'
