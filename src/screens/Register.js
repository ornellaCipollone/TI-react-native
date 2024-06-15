import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { db, auth } from '../firebase/config'

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: " ",
            userName: " ",
            password: " ",
            bio: " ",
            profileImage: " ",
            errorMensaje: " ",
        };
    }
    componentDidMount(){
        //console.log("Chequear si el usuario esta logueado en firebase");

        auth.onAuthStateChanged( user=>{
            console.log(user)
            if(user){
                this.props.navigation.navigate('Login')
            }
        })
    }
    register(email, userName, password, bio, profileImage){
        if (email && password && userName){
            auth.createUserWithEmailAndPassword(email, password)
            .then(response=>{
            db.collection('users').add({
                owner: auth.currentUser.email,
                userName: userName,
                bio: bio || " ",
                profileImage: profileImage || '',
                createdAt: Date.now(),
            })
            this.props.navigation.navigate("Login")
            })
            .catch(error => {
                this.setState({errorMensaje:error.mensaje});
                console.error("Firebase authentication error:", error);
            });
        }else{
            this.setState({errorMensaje: "Todos los campos obligatorios se deben completar"});
        }
    };
    render() {
        return (
            <View> 
                <View>
                    <Text>Registro</Text>
                    {this.state.errorMessage ? <Text>{this.state.errorMessage}</Text> : null}
                    <TextInput
                        onChangeText={text => this.setState({ email: text })}
                        placeholder='Email'
                        keyboardType='email-address'
                        value={this.state.email}
                    />
                    <TextInput
                        onChangeText={text => this.setState({ userName: text })}
                        placeholder='Nombre de usuario'
                        keyboardType='default'
                        value={this.state.userName}
                    />
                    <TextInput
                        onChangeText={text => this.setState({ password: text })}
                        placeholder='Contraseña'
                        keyboardType='default'
                        secureTextEntry={true}
                        value={this.state.password}
                    />
                    <TextInput
                        onChangeText={text => this.setState({ bio: text })}
                        placeholder='Mini Bio (opcional)'
                        keyboardType='default'
                        value={this.state.bio}
                    />
                    <TextInput
                        onChangeText={text => this.setState({ profileImage: text })}
                        placeholder='URL de la foto de perfil (opcional)'
                        keyboardType='default'
                        value={this.state.profileImage}
                    />
                    <TouchableOpacity onPress={()=> this.register(this.state.email,this.state.password,this.state.userName, this.state.bio, this.state.profileImage)}disabled={!this.state.email || !this.state.password || !this.state.userName}>
                        <Text>Registrarse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text>¿Ya tienes una cuenta? Ir al login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default Register