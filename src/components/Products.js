import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGetProductsQuery } from '../services/shop';

const Products = ({ route, navigation }) => {
    const { category } = route.params; // Obtener la categoría desde los parámetros de la ruta
    const { data: products } = useGetProductsQuery();
    
    if (!products || !category) return null;

    const items = products[category];

    const handleItemPress = (product) => {
        navigation.navigate('ProductDetails', { product }); // Navegar a la pantalla de detalles con el producto seleccionado
    };

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.nombre}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleItemPress(item)}>
                    <View style={styles.productContainer}>
                        <Text style={styles.productText}>{item.nombre}</Text>
                    </View>
                </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default Products;

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    productContainer: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    productText: {
        fontSize: 16,
        color: '#333',
    },
});
