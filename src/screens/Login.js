import React, { Component } from 'react';
import { auth } from '../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            errorMessage: ''
        }
    }

componentDidMount(){
    auth.onAuthStateChanged((user)=> {
        if (user){
            this.props.navigation.navigate("TabNavigation");
        }
    })
}

    login (email, pass){
        if(email && pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( response => {
                //Cuando firebase responde sin error
                console.log('Login ok', response);

                //Cambiar los estados a vacío como están al inicio.
                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('TabNavigation')

            })
            .catch( error => {
                //Cuando Firebase responde con un error.
                this.setState({ errorMessage: "El mail o la contraseña son incorrectos" });
                    console.error('Firebase authentication error:', error);
            }) 
        } else {
            this.setState({ errorMessage: 'Por favor, completa todos los campos.' });
            //this.props.navigation.navigate('TabNavigation')
        }

    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title} >Login</Text>
                    {this.state.errorMessage ? <Text style={styles.errorText}>{this.state.errorMessage}</Text> : null}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({email: text})}
                        placeholder='Email'
                        keyboardType='email-address'
                        value={this.state.email}
                        />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({password: text})}
                        placeholder='Password'
                        keyboardType='default'
                        secureTextEntry={true}
                        value={this.state.password}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}  disabled={!this.state.email || !this.state.password} >
                        <Text style={styles.textButton}>Ingresar</Text>    
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
                    <Text style={styles.registerText} >No tengo cuenta. Registrarme.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
//falta css

export default Login