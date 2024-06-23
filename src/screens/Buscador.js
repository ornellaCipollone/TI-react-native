import { Text, View, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { db } from '../firebase/config';

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            busqueda: '',
            resultados: [],
            mensaje: '',
        };
    }

    componentDidMount() {
        // Traer los usuarios de la db
        db.collection('users')
            .onSnapshot(docs => {
                let users = [];

                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });

                this.setState({
                    usuarios: users,
                });
            });
    }

    controlarCambios(text) {
        this.setState({
            busqueda: text,
        });
    }

    buscarUsuarios() {
        const busquedaLower = this.state.busqueda.toLowerCase();

        const resultados = this.state.usuarios.filter((usuario) =>
            usuario.data.userName.toLowerCase().includes(busquedaLower)
        );

        if (resultados.length === 0) {
            this.setState({
                resultados: [],
                mensaje: 'No hay resultados que coincidan con su búsqueda.',
            });
        } else {
            this.setState({
                resultados: resultados,
                mensaje: '',
            });
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        keyboardType='default'
                        placeholder='Ingrese su búsqueda de usuario..'
                        onChangeText={(text) => this.controlarCambios(text)}
                        value={this.state.busqueda}
                    />
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => this.buscarUsuarios()}
                    >
                        <Text style={styles.searchButtonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>

                {this.state.mensaje ? (
                    <Text style={styles.message}>{this.state.mensaje}</Text>
                ) : (
                    <FlatList
                        style={styles.resultsList}
                        data={this.state.resultados}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.resultItem}>
                                <TouchableOpacity 
                                    style={styles.resultButton} 
                                    onPress={() => this.props.navigation.navigate('SuPerfil', { mailUser: item.data.owner })}
                                >
                                    <Image
                                        style={styles.userImage}
                                        source={{ uri: item.data.profileImage || 'https://via.placeholder.com/150' }}
                                    />
                                    <Text style={styles.userName}>User Name: {item.data.userName}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    message: {
        textAlign: 'center',
        color: '#ff5a5f',
        fontSize: 16,
        marginTop: 20,
    },
    resultsList: {
        marginTop: 20,
    },
    resultItem: {
        backgroundColor: 'grey',
        borderRadius: 5,
        marginVertical: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    resultButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
    },
});

export default Buscador;
