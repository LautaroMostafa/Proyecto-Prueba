import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { auth } from '../firebase/firebaseConfig'; // Firebase Auth
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore
import { URL_FIREBASE } from '../firebase/database'; // URL de la base de datos

const db = getFirestore(); // Inicializa Firestore

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL_FIREBASE }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/productos.json',
    }),
    registerUser: builder.mutation({
      queryFn: async ({ email, password, name }) => {
        try {
          const userCredential = await auth.createUserWithEmailAndPassword(email, password);
          const user = userCredential.user;

          await setDoc(doc(db, 'users', user.uid), {
            name,
            email,
            cart: [],
            orders: [],
          });

          return { data: { id: user.uid, name, email } };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
    }),
    addToCart: builder.mutation({
      queryFn: async ({ userId, product }) => {
        try {
          const userDoc = doc(db, 'users', userId);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const currentCart = userSnapshot.data().cart || [];
            currentCart.push(product); // Agrega el producto al carrito

            await setDoc(userDoc, { cart: currentCart }, { merge: true });
            return { data: currentCart }; // Retorna el carrito actualizado
          } else {
            return { error: { status: 'CUSTOM_ERROR', error: 'User not found' } };
          }
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
    }),
    finalizePurchase: builder.mutation({
      queryFn: async ({ userId }) => {
        try {
          const userDoc = doc(db, 'users', userId);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const cart = userSnapshot.data().cart || [];
            const orderDoc = doc(db, 'orders', userId);
            await setDoc(orderDoc, {
              products: cart,
              date: new Date(),
            });
            // Limpia el carrito después de finalizar la compra
            await setDoc(userDoc, { cart: [] }, { merge: true });
            return { data: 'Purchase finalized successfully!' };
          } else {
            return { error: { status: 'CUSTOM_ERROR', error: 'User not found' } };
          }
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
    }),
    getUser: builder.query({
      query: (userId) => `/users/${userId}.json`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useRegisterUserMutation,
  useAddToCartMutation,
  useFinalizePurchaseMutation,
  useGetUserQuery,
} = shopApi;
