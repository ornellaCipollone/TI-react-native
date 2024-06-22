import React, { Component } from 'react';
import { auth } from '../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Image, ScrollView } from 'react-native';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate("TabNav");
            }
        })
    }

    login(email, pass) {
        if (email && pass) {
            auth.signInWithEmailAndPassword(email, pass)
                .then(response => {
                    console.log('Login ok', response);
                    this.props.navigation.navigate('TabNav')
                })
                .catch(error => {
                    this.setState({ errorMessage: "El mail o la contraseña son incorrectos" });
                    console.error('Firebase authentication error:', error);
                })
        } else {
            this.setState({ errorMessage: 'Por favor, completa todos los campos.' });
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>Login</Text>
                    {this.state.errorMessage ? (
                        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    ) : null}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ email: text })}
                        placeholder='Email'
                        keyboardType='email-address'
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ password: text })}
                        placeholder='Password'
                        keyboardType='default'
                        secureTextEntry={true}
                        value={this.state.password}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.login(this.state.email, this.state.password)}
                        disabled={!this.state.email || !this.state.password}
                    >
                        <Text style={styles.buttonText}>Ingresar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.link}
                        onPress={() => this.props.navigation.navigate('Register')}
                    >
                        <Text style={styles.linkText}>No tengo cuenta. Registrarme.</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    form: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    errorMessage: {
        color: '#ff5a5f',
        textAlign: 'center',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        marginTop: 20,
    },
    linkText: {
        color: '#007BFF',
    },
});

export default Login;
