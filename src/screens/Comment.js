import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'


class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            NuevoComentario: "",
            id: "",
            data: {},
        }
    }
    componentDidMount() {
        db.collection("posts")
            .doc(this.props.route.params.id)
            .onSnapshot(doc => {
                this.setState({ id: doc.id, data: doc.data() })
            })
    }

    agregarComentario(id, comentario) {
        db.collection("posts")
            .doc(id)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    comentario: comentario
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.data.comentarios && this.state.data.comentarios.length > 0 ? (
                    <View>
                        <FlatList
                            data={this.state.data.comentarios}
                            keyExtractor={item => item.createdAt.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.commentContainer}>
                                    <Text style={styles.ownerText}>{item.owner}:</Text>
                                    <Text style={styles.commentText}>{item.comentario}</Text>
                                </View>
                            )}
                        />
                    </View>
                ) : (
                    <Text>No hay comentarios aún.</Text>
                )}
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={text => this.setState({ NuevoComentario: text })}
                        keyboardType='default'
                        placeholder='Agrega un comentario'
                        value={this.state.NuevoComentario}
                    />
                    <TouchableOpacity onPress={() => this.agregarComentario(this.state.id, this.state.NuevoComentario)}>
                        <Text style={styles.commentButtonText}>Comentar</Text>
                    </TouchableOpacity>
                </View>
                <Text onPress={() => this.props.navigation.navigate("TabNav")}>
                    Volver a home
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    commentContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingBottom: 10,
        marginBottom: 10,
    },
    ownerText: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    commentText: {
        color: '#333333',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: 10,
        marginRight: 10,
    },
    commentButton: {
        padding: 10,
        backgroundColor: '#3897f0',
        borderRadius: 5,
    },
    commentButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
    goBackText: {
        marginTop: 20,
        color: '#black',
        textDecorationLine: 'underline',
    },
});

export default Comment