import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { auth, db } from '../firebase/firebaseConfig'; 
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const CartView = ({ navigation }) => {
    const [cart, setCart] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                fetchCart(user.uid);
            } else {
                Alert.alert('Error', 'Debes iniciar sesión para acceder al carrito.');
                navigation.navigate('Login'); // Redirigir al inicio de sesión
            }
        });

        return () => unsubscribe(); // Limpia el listener
    }, [navigation]);

    const fetchCart = async (userId) => {
        const cartDoc = doc(db, 'users', userId);
        const cartSnapshot = await getDoc(cartDoc);
        if (cartSnapshot.exists()) {
            setCart(cartSnapshot.data().cart);
        } else {
            setCart([]); // Si no hay carrito, inicializa como vacío
        }
    };

    const handleFinalizePurchase = async () => {
        if (!userId) {
            Alert.alert('Error', 'Debes iniciar sesión para finalizar la compra.');
            return;
        }

        const ordersDoc = doc(db, 'orders', userId);
        const orderData = {
            products: cart,
            date: new Date(),
        };

        try {
            await setDoc(ordersDoc, orderData, { merge: true });
            Alert.alert('Éxito', 'Compra finalizada');
            setCart([]); // Limpiar el carrito
            // Opcionalmente, puedes eliminar los productos del carrito en Firestore
        } catch (error) {
            Alert.alert('Error', 'No se pudo finalizar la compra: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carrito</Text>
            {cart.length > 0 ? (
                cart.map((item, index) => (
                    <View key={index}>
                        <Text>{item.nombre} - Cantidad: {item.cantidad}</Text>
                    </View>
                ))
            ) : (
                <Text>No hay productos en el carrito.</Text>
            )}
            <Button title="Finalizar Compra" onPress={handleFinalizePurchase} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default CartView;
