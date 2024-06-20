import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Camara from "../components/Camara"
import {db, auth} from '../firebase/config'

class CrearPosteo extends Component {
  constructor(props){
    super(props)
    this.state = {
        camara: true,
        texto: '',
        urlFoto: ''
    }
  }
  
  crearPosteo(){
    db.collection('posts').add({
        owner: auth.currentUser.email,
        texto: this.state.texto,
        createdAt: Date.now(),
        likes: [],
        comentarios: [],
        foto: this.state.urlFoto
    })
    .then(()=>{
        this.setState({
            camara: true,
            texto: '',
            urlFoto: ''
        })
    })
    .catch( e => console.log(e)) 
  }

  onImageUpload(url){
    this.setState({
        camara: false,
        urlFoto: url
    })
  }

    render() {
    return (
      <View>
        {
            this.state.camara ?
            <Camara onImageUpload = {(url)=> this.onImageUpload(url)}/>
            :
            <View>
               <Text>New Post</Text>
               
               <TextInput
                onChangeText={(text)=> this.setState({texto: text})}
                placeholder='Añade una descripción'
                keyboardType='default'
                value={this.state.texto}
               /> 

               <TouchableOpacity onPress={()=> this.crearPosteo()}>
                <Text>Postear</Text>
               </TouchableOpacity>
            </View>
        }
      </View>
    )
  }
}

export default CrearPosteo