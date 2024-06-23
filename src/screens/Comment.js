import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NuevoComentario: "",
            id: "",
            data: {},
        };
    }

    componentDidMount() {
        db.collection("posts")
            .doc(this.props.route.params.id)
            .onSnapshot(doc => {
                this.setState({ id: doc.id, data: doc.data() });
            });
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
            });
        this.setState({ NuevoComentario: '' }); // Limpiar el campo de texto después de agregar un comentario
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.data.comentarios && this.state.data.comentarios.length > 0 ? (
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
                ) : (
                    <Text style={styles.noCommentsText}>No hay comentarios aún.</Text>
                )}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({ NuevoComentario: text })}
                        keyboardType='default'
                        placeholder='Agrega un comentario'
                        value={this.state.NuevoComentario}
                    />
                    <TouchableOpacity
                        style={styles.commentButton}
                        onPress={() => this.agregarComentario(this.state.id, this.state.NuevoComentario)}
                        disabled={!this.state.NuevoComentario} // Desactivar el botón si el campo de comentario está vacío
                    >
                        <Text style={styles.commentButtonText}>Comentar</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.navigate("TabNav")}>
          <Text style={styles.backButtonText}>Volver a Home</Text>
        </TouchableOpacity>
            </View>
        );
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
        color: '#007BFF', // Color azul para resaltar
    },
    commentText: {
        color: '#333333',
    },
    noCommentsText: {
        textAlign: 'center',
        marginVertical: 20,
        color: '#666666',
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
        borderRadius: 5,
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
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
      },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
});

export default Comment;
