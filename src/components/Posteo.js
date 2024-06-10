import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { Component } from 'react'
import firebase from 'firebase'
import { db, auth } from '../firebase/config'

class Posteo extends Component {
  constructor(props){
    super(props)
    this.state = {
        like : false,
        cantidadLikes: this.props.dataPost.data.likes.length,
        cantidadComentarios: this.props.dataPost.data.comentarios.length,
        mostrarMensaje: false   
    }
  }

  componentDidMount(){
        if(this.props.dataPost.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                like: true
            })
        }
  }

  likear(){
    db.collection('posts').doc(this.props.dataPost.id).update({
        likes: firebase.firestone.FieldValue.arrayUnion(auth.currentUser.email)
    })
        .then(res => this.setState({
            like: true,
            cantidadLikes: this.props.dataPost.data.likes.length
        }))
        .catch(e => console.log(e))
  }

  sacarLike(){
    db.collection('posts').doc(this.props.dataPost.id).update({
        likes: firebase.firestone.FieldValue.arrayRemove(auth.currentUser.email)
    })
        .then(res => this.setState({
            like: false,
            cantidadLikes: this.props.dataPost.data.likes.length
        }))
        .catch(e => console.log(e))
  }

  borrarPosteo = () => {
    const postOwner = this.props.dataPost.data.owner;
    const currentUserEmail = auth.currentUser.email;
    if (postOwner === currentUserEmail) {
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .delete()
            .then(() => {
                console.log('Post eliminado correctamente');
            })
            .catch(error => {
                console.error('Error al eliminar el post:', error);
            });
        } else {
            this.setState({mostrarMensaje: true})
        }
    };
  
    render() {
    return (
        <View>
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'SuPerfil', {mailUser: this.props.dataPost.data.owner})}>
                    <Text>Posteo de: {this.props.dataPost.data.owner}</Text>
                </TouchableOpacity>
                <Image source={{uri:this.props.dataPost.data.foto}}/>
            </View>
            
            <Text>{this.props.dataPost.data.textoPost}</Text>
            
            <View>
                {
                    this.state.like ?
                        <TouchableOpacity onPress={() => this.sacarLike()}>
                            <FontAwesome name='heart' color='red' size={20} />
                        </TouchableOpacity>

                        :
                        <TouchableOpacity onPress={() => this.likear()}>
                            <FontAwesome name='heart-o' color='black' size={20} />
                        </TouchableOpacity>

                }


                <Text>{this.state.cantidadLikes} Likes</Text>
                
                <Text>{this.state.cantidadComentarios} Comentarios</Text>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'Comment', { id: this.props.dataPost.id })}>
                    <FontAwesome  name='comment' color='#3498db' size={20} />
                </TouchableOpacity>
                
                
                {this.state.mostrarMensaje ? 
                null : (
                <TouchableOpacity onPress={this.borrarPosteo}>
                    <FontAwesome name="trash" size={20} color="red" />
                </TouchableOpacity>
                )}
                
                {this.state.mostrarMensaje ? 
                (
                    <View>
                    <FontAwesome name="exclamation-circle" size={15} color="red" />
                    <Text>No tienes permiso para eliminar este post.</Text>
                    </View>
                ):
                null}
                
            </View>
        </View>
    )
  }
}

export default Posteo