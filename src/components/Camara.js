import React, { Component } from "react";
import { Camera } from "expo-camera";
import { Text, View, TouchableOpacity, Image } from "react-native";
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
    console.log(this.state.photo);
    return (
      <>
        {this.state.permisos ? (
          this.state.showCamera ? (
            <View >
              <Camera
                type={Camera.Constants.Type.front}
                ref={metodosCamara => this.metodosCamara = metodosCamara}
              />
              <TouchableOpacity
                
                onPress={() => this.sacarFoto()}
              >
                <Text >Sacar foto</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View >
              <Image  source={{ uri: this.state.photo }} />
              <TouchableOpacity
              
                onPress={() => this.aceptarFoto()}
              >
                <Text>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.rechazarFoto()}
              >
                <Text>Rechazar</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <Text>El acceso a la cámara está deshabilitado</Text>
        )}
      </>
    );
  }
}
export default Camara;
