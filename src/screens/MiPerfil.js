import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native'
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


    signOut() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.profileInfo}>
                    <Text style={styles.username}>Bienvenido {this.state.infoUser.userName}</Text>
                    <Text style={styles.bio}>Biografía: {this.state.infoUser.bio}</Text>
                    <Text style={styles.email}>Mail: {auth.currentUser.email}</Text>
                    <Image style={styles.profileImage} source={{ uri: this.state.infoUser.profileImage }} />

                </View>

                <Text style={styles.sectionTitle}>Mis posteos:</Text>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Posteo dataPost={item} />}
                />

                <TouchableOpacity style={styles.logoutButton} onPress={() => this.signOut()}>
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
    },
    profileInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bio: {
        fontSize: 16,
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        marginBottom: 15,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 45,
    },
    logoutButton: {
        backgroundColor: '#ff5a5f',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',

}
});

export default MiPerfil