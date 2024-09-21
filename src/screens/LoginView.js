import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_AUTH, URL_AUTH } from '../firebase/database';

const LoginView = ({ navigation, checkAuthentication }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await fetch(`${URL_AUTH}accounts:signInWithPassword?key=${API_AUTH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('authToken', data.idToken);
        checkAuthentication(); // Llama a la función para verificar la autenticación
        Alert.alert('Login exitoso', `¡Bienvenido de nuevo, ${data.email}!`);
      } else {
        Alert.alert('Error al iniciar sesión', data.error.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema con el inicio de sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Button
        title="¿No tienes cuenta? Registrarse"
        onPress={() => navigation.navigate('Register')}
        color="gray"
      />
    </View>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});
