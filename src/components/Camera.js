import React, { Component } from "react";
import {Camera} from 'expo-camera'
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { storage } from "../firebase/config";


class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permisos: false, 
            photo: '', 
            showCamera: true
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then(res => {
                if (res.granted === true) {
                    this.setState({
                        permisos: true
                    })
                }
            })
            .catch(e => console.log(e))
    }

    sacarFoto(){
        this.metodosCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    photo: photo.uri,
                    showCamera: false
                })
            })
            .catch(e => console.log(e))
    }

    rechazarFoto(){
        this.setState({
            showCamera: true,
        })
    }

    aceptarFoto(){
        fetch(this.state.photo)
            .then(res => res.blob())
            .then(image => {
                const ref = storage.ref(`photo/${Date.now()}.jpg`)
                ref.put(image)
                .then( () => {
                    ref.getDownloadURL()
                    .then( url => {
                        this.props.onImageUpload(url)
                    })
                })
            })
            .catch(e => console.log(e))
    }

    render(){

        console.log(this.state.photo)
        return (
            <>
                {this.state.permisos ? 
                this.state.showCamera ?
                <View style={styles.formContainer} >
                    <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={metodosCamara => this.metodosCamara = metodosCamara}/>
                    <TouchableOpacity
                        style={styles.button}
                         onPress={() => this.sacarFoto()}
                        >
                        <Text style={styles.textButton}>Sacar foto</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.formContainer}>
                    <Image style={styles.camera} source={{uri: this.state.photo}} />
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
                :
                <Text>No me diste los permisos de la camara</Text>
                }
            </>
        )
    }
}


export default Camera