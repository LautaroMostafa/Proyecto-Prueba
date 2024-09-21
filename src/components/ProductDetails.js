import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useAddToCartMutation } from '../services/shop';
import { auth } from '../firebase/firebaseConfig';

const ProductDetails = ({ route }) => {
    const { product } = route.params;
    const userId = auth.currentUser?.uid; // Obtiene el ID del usuario actual
    const [addToCart] = useAddToCartMutation();

    const handleAddToCart = async () => {
        if (userId) {
            try {
                await addToCart({ userId, product }).unwrap();
                Alert.alert('Éxito', 'Producto agregado al carrito');
            } catch (error) {
                Alert.alert('Error', 'No se pudo agregar el producto: ' + error.message);
            }
        } else {
            Alert.alert('Error', 'Debes iniciar sesión para agregar productos al carrito');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{product.nombre}</Text>
            <Text style={styles.price}>Precio: ${product.precio}</Text>
            <Button title="Agregar al Carrito" onPress={handleAddToCart} />
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
    price: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default ProductDetails;
