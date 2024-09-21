import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGetProductsQuery } from '../services/shop';

const Categories = ({ navigation }) => {
    const { data: products } = useGetProductsQuery();
    if (!products) return null;

    const categories = Object.keys(products);

    const handleCategoryPress = (category) => {
        navigation.navigate('Products', { category });
    };

    return (
        <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item: category }) => (
                <TouchableOpacity onPress={() => handleCategoryPress(category)}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>{category}</Text>
                    </View>
                </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default Categories;

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    categoryContainer: {
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
    categoryText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
});
