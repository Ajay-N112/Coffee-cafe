

import { StyleSheet, Text, View, StatusBar, Pressable, Alert, ScrollView, Dimensions, TextInput } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import React, { useState } from 'react';
import { registerAPI } from '../Services/allAPI';

const Register = ({ navigation }) => {
    const [details, setDetails] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const handleInput = (key, value) => {
        setDetails({ ...details, [key]: value });
    };

    const handleRegister = async () => {
        const { name, email, phoneNumber, password, confirmPassword } = details;
        if (!name || !email || !phoneNumber || !password || !confirmPassword) {
            Alert.alert('Please fill the form completely!');
        } else {
            const response = await registerAPI(details);
            if (response.status === 200) {
                Alert.alert('Registered successfully');
                navigation.navigate('Login');
            } else {
                Alert.alert('Something went wrong!');
            }
        }
    };

    const windowHeight = Dimensions.get('window').height;

    return (
        <ScrollView contentContainerStyle={{ height: windowHeight }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <StatusBar backgroundColor='#333' />
                <View style={styles.top}>
                    <View style={{ flex: 1, paddingLeft: 20 }}>
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Icons name='arrowleft' size={35} color="white" />
                        </Pressable>
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.title}>Sign Up</Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.form}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            value={details.name}
                            onChangeText={(value) => handleInput('name', value)}
                            style={styles.input}
                            placeholderTextColor="#A0A0A0"
                        />

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            value={details.email}
                            onChangeText={(value) => handleInput('email', value)}
                            style={styles.input}
                            placeholderTextColor="#A0A0A0"
                        />

                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            value={details.phoneNumber}
                            onChangeText={(value) => handleInput('phoneNumber', value)}
                            style={styles.input}
                            placeholderTextColor="#A0A0A0"
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            value={details.password}
                            onChangeText={(value) => handleInput('password', value)}
                            style={styles.input}
                            placeholderTextColor="#A0A0A0"
                            secureTextEntry
                        />

                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            value={details.confirmPassword}
                            onChangeText={(value) => handleInput('confirmPassword', value)}
                            style={styles.input}
                            placeholderTextColor="#A0A0A0"
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.footer}>
                        <Pressable onPress={handleRegister} style={styles.button}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.loginText}>Already have an account? Log In</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
    },
    top: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottom: {
        flex: 8.5,
        backgroundColor: '#f0f0f0',
        borderTopStartRadius: 100,
    },
    title: {
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
    },
    form: {
        flex: 8,
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 20,
    },
    footer: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    button: {
        height: 50,
        backgroundColor: 'black',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    loginText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    input: {
        backgroundColor: '#F0F0F0',
        fontSize: 16,
        height: 40,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
    },
});

export default Register;
