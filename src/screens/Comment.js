import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'


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
            <View>
                {this.state.data.comentarios && this.state.data.comentarios.length > 0 ? (
                    <View>
                        <FlatList
                            data={this.state.data.comentarios}
                            keyExtractor={item => item.createdAt.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    <Text>{item.owner}:</Text>
                                    <Text>{item.comentario}</Text>
                                </View>
                            )}
                        />
                    </View>
                ) : (
                    <Text>No hay comentarios aún.</Text>
                )}
                <View>
                    <TextInput
                        onChangeText={text => this.setState({ NuevoComentario: text })}
                        keyboardType='default'
                        placeholder='Agrega un comentario'
                        value={this.state.newComment}

                    />
                    <TouchableOpacity onPress={() => this.agregarComentario(this.state.id, this.state.NuevoComentario)}>
                        <Text>Comentar</Text>
                    </TouchableOpacity>
                </View>
                <Text onPress={() => this.props.navigation.navigate("TabNav")}>
                    Volver a home
                </Text>
            </View>
        )
    }
}

export default Comment