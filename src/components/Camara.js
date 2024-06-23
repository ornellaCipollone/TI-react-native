import React, { Component } from "react";
import { Camera } from "expo-camera/legacy";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { storage } from "../firebase/config";

class Camara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permisos: false,
      photo: "",
      showCamera: true,
    };
  }

  componentDidMount() {
    Camera.requestCameraPermissionsAsync()
      .then((res) => {
        if (res.granted === true) {
          this.setState({
            permisos: true,
          });
        }
      })
      .catch((e) => console.log(e));
  }

  sacarFoto() {
    this.metodosCamara
      .takePictureAsync()
      .then((photo) => {
        this.setState({
          photo: photo.uri,
          showCamera: false,
        });
      })
      .catch((e) => console.log(e));
  }

  rechazarFoto() {
    this.setState({
      showCamera: true,
    });
  }

  aceptarFoto() {
    fetch(this.state.photo)
      .then((res) => res.blob())
      .then((image) => {
        const ref = storage.ref(`photo/${Date.now()}.jpg`);
        ref.put(image).then(() => {
          ref.getDownloadURL().then((url) => {
            this.props.onImageUpload(url);
          });
        });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <>
        {this.state.permisos ? (
          this.state.showCamera ? (
            <View style={styles.formContainer}>
              <Camera
                style={styles.camera}
                type={Camera.Constants.Type.front}
                ref={(metodosCamara) => (this.metodosCamara = metodosCamara)}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.sacarFoto()}
              >
                <Text style={styles.textButton}>Sacar foto</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Image style={styles.camera} source={{ uri: this.state.photo }} />
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.aceptarFoto()}
              >
                <Text style={styles.textButton}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.rechazarFoto()}
              >
                <Text style={styles.textButton}>Rechazar</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
              Los permisos de la cámara no están habilitados
            </Text>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    height: `60vh`,
    widht: `100vw`,
  },
  camera: {
    widht: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#0095f6",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
    borderColor: "#0077c2",
    height: 40,
    justifyContent: "center",
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default Camara;
