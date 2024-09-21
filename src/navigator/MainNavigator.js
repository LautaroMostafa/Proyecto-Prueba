import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AuthStack from './AuthStack';
import TabNavigator from './TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

const MainNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token); // Si el token existe, está autenticado
    } catch (error) {
      console.error('Error al verificar la autenticación', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Detiene el indicador de carga
    }
  };

  useEffect(() => {
    checkAuthentication(); // Llamada inicial para verificar autenticación
  }, []); // Elimina checkAuthentication de las dependencias

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <TabNavigator checkAuthentication={checkAuthentication} />
      ) : (
        <AuthStack checkAuthentication={checkAuthentication} />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
