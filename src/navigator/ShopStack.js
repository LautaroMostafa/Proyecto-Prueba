import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native'
import Categories from '../components/Categories';
import Products from '../components/Products';
import ProductDetails from '../components/ProductDetails';

const Stack = createNativeStackNavigator();

const ShopStack = () => {
    return (
            <Stack.Navigator initialRouteName="Categories">
                <Stack.Screen name="Categories" component={Categories} />
                <Stack.Screen name="Products" component={Products} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} />
            </Stack.Navigator>
    )
}

export default ShopStack

const styles = StyleSheet.create({})