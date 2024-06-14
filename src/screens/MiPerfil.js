import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Posteo from '../components/Posteo';

class MiPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posteos: [],
            infoUser: {},
            id: ''
        }
    }
    componentDidMount() {
        db.collection('posts').where('owner', '==', auth.currentUser.email)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                docs => {

                    let posts = [];

                    docs.forEach(doc => {
                        posts.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })

                    this.setState({
                        posteos: posts
                    })
                }
            )
        db.collection('users').where('owner', '==', auth.currentUser.email)
        .onSnapshot(
            docs => {

    
                docs.forEach(doc => {
                    this.setState({
                        id: doc.id,
                        infoUser: doc.data
                    })
                })

               
            }
        )
    }


signOut(){
    auth.signOut()
    this.props.navigation.navigate('Login')
}


    render() {
        return (
            <View>
                 <View >
                    <Text>Bienvenido {this.state.infoUser.userName}</Text>
                    <Text>Biografía: {this.state.infoUser.bio}</Text>
                    <Text>Mail: {auth.currentUser.email}</Text>
                    <Image source={{ uri: this.state.infoUser.profileImage }} />
                
                </View>

                <Text>Mis posteos:</Text>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Posteo dataPost={item} />}
                />

                <TouchableOpacity onPress={() => this.signOut()}>
                    <Text>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default MiPerfil