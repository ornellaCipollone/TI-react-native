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
        db.collection
    }








    render() {
        return (
            <View>
                <Text>MiPerfil</Text>
            </View>
        )
    }
}


export default MiPerfil