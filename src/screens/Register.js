import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { db, auth } from "../firebase/config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: " ",
      userName: " ",
      password: " ",
      bio: " ",
      profileImage: " ",
      errorMessage: " ",
    };
  }
  componentDidMount() {
    //console.log("Chequear si el usuario esta logueado en firebase");

    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.props.navigation.navigate("Login");
      }
    });
  }
  register(email, userName, password, bio, profileImage) {
    if (email && password && userName) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          db.collection("users").add({
            owner: auth.currentUser.email,
            userName: userName,
            bio: bio || " ",
            profileImage: profileImage || "",
            createdAt: Date.now(),
          });
          this.props.navigation.navigate("Login");
        })
        .catch((error) => {
          this.setState({ errorMensaje: error.mensaje });
          console.error("Firebase authentication error:", error);
        });
    } else {
      this.setState({
        errorMensaje: "Todos los campos obligatorios se deben completar",
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}> Registro</Text>
          {this.state.errorMessage ? (
            <Text style={styles.errorText}> {this.state.errorMessage}</Text>
          ) : null}
          <TextInput style={styles.input}
            onChangeText={(text) => this.setState({ email:text })}
            placeholder="Email"
            keyboardType="email-address"
            value={this.state.email}
          />
          <TextInput style={styles.input}
            onChangeText={(text) => this.setState({ userName:text })}
            placeholder="Nombre de usuario"
            keyboardType="default"
            value={this.state.userName}
          />
          <TextInput style={styles.input}
            onChangeText={(text) => this.setState({ password:text })}
            placeholder="Contraseña"
            keyboardType="default"
            secureTextEntry={true}
            value={this.state.password}
          />
          <TextInput style={styles.input}
            onChangeText={(text) => this.setState({ bio: text })}
            placeholder="Mini Bio (opcional)"
            keyboardType="default"
            value={this.state.bio}
          />
          <TextInput style={styles.input}
            onChangeText={(text) => this.setState({ profileImage: text })}
            placeholder="URL de la foto de perfil (opcional)"
            keyboardType="default"
            value={this.state.profileImage}
          />

          <TouchableOpacity style={styles.button}
            onPress={() =>
              this.register(
                this.state.email,
                this.state.userName,
                this.state.password,
                this.state.bio,
                this.state.profileImage
              )
            }
            disabled={
              !this.state.email || !this.state.password || !this.state.userName
            }
          >
            <Text style={styles.textButton}>Registrarse</Text>
          </TouchableOpacity >

          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>¿Ya tienes una cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    paddingHorizontal: 40,
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 5,
  },
  button: {
    borderColor: '#0089e0',
    backgroundColor: '#0095f6',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#003569',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
export default Register;
