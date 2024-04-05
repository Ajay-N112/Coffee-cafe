import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

const Input = ({ children, secureTextEntry, value, onChangeText }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{children}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                style={styles.input}
                placeholderTextColor="#A0A0A0"
               
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#F0F0F0',
        fontSize: 16,
        height: 40,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#C0C0C0',
    },
});

export default Input;
