import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase/firebaseConfig'; // Firebase Auth

const Profile = ({ navigation, checkAuthentication }) => {
    const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                // Si el usuario está autenticado, obtenemos sus datos
                const userData = {
                    avatar: "https://via.placeholder.com/150", // Puedes cambiar esto por un avatar real
                    nombre: currentUser.displayName || 'Usuario', // Mostrar nombre o 'Usuario' si está vacío
                    email: currentUser.email,
                };
                setUser(userData); // Establecer datos del usuario en el estado
            } else {
                Alert.alert('Error', 'No se encontró el usuario.');
                setUser(null); // Reiniciar el estado del usuario
            }
            setLoading(false); // Detener la carga
        });

        // Limpiar el listener al desmontar el componente
        return () => unsubscribe();
    }, []);

    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    const handleLogout = async () => {
        setLoading(true); // Iniciar la carga
        try {
            await auth.signOut();
            await AsyncStorage.removeItem('authToken');
            checkAuthentication(); // Verificar autenticación después de cerrar sesión
        } catch (error) {
            Alert.alert('Error al cerrar sesión', error.message);
        } finally {
            setLoading(false); // Detener la carga
        }
    };

    if (loading) {
        return <View style={styles.loadingContainer}><Text>Cargando...</Text></View>; // Mensaje de carga
    }

    if (!user) {
        return <View style={styles.loadingContainer}><Text>No se encontró el usuario.</Text></View>; // Mensaje si no hay usuario
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{user.nombre}</Text>
            <Text style={styles.email}>{user.email}</Text>

            <View style={styles.buttonContainer}>
                <Button title="Editar Perfil" onPress={handleEditProfile} />
            </View>

            <View style={styles.buttonContainer}>
                <Button title={loading ? "Cerrando sesión..." : "Cerrar Sesión"} color="red" onPress={handleLogout} disabled={loading} />
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: '#555',
        marginBottom: 20,
    },
    buttonContainer: {
        marginBottom: 10,
        width: '100%',
    },
});
