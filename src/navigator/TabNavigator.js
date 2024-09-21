import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from './ShopStack'
import CartStack from './CartStack';
import ProfileStack from './ProfileStack';
import OrdersStack from './OrdersStack';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ checkAuthentication }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Shop" component={ShopStack} />
            <Tab.Screen name="Cart" component={CartStack} />
            <Tab.Screen name="Orders" component={OrdersStack} />
            <Tab.Screen
                name="Profile"
                children={() => <ProfileStack checkAuthentication={checkAuthentication} />}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({})