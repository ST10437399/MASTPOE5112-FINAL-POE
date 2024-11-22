import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ZamaskitchenRoot } from '../navigation';

type NavigationProp = NativeStackNavigationProp<ZamaskitchenRoot, 'chefslogin', 'LoginPage'>;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProp>();

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in both fields.');
            return;
        }
        
        navigation.navigate('ChefsMenu');
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.pagecontainer}>
        
                <Image 
                    source={require('../assets/images/Chefs Login.jpg')} 
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.headerText}>Chefs Login</Text>
            </SafeAreaView>

            <View style={styles.card}>
                <Text style={styles.title}>OceanosCuisine</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                
                <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'beige',
    },
    pagecontainer: {
        backgroundColor: '#373737',
    },
    headerText: {
        padding: 20,
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
    },
    image: {
        width: 150,  
        height: 150, 
        alignSelf: 'center', 
        marginBottom: 10, 
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    LoginButton: {
        backgroundColor: '#373737',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LoginPage;

