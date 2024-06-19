import { Text, View, TextInput, TouchableOpacity, FlatList, StyleSheet  } from 'react-native'
import React, { Component } from 'react'
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
        //Traer los usuarios de la db
        db.collection('users')
        .onSnapshot(docs =>{
            
            let users = []
            
            docs.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            
            this.setState({
                usuarios: users,
            });
        })
    }

    controlarCambios(text) {
        this.setState({
            busqueda: text
        })
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
        <View> 
            <TextInput
                keyboardType='default'
                placeholder='Ingrese su búsqueda de usuario..'
                onChangeText={(text) => this.controlarCambios(text)}
                value={this.state.busqueda}
            />
            <TouchableOpacity
                onPress={() => this.buscarUsuarios()}
            >
                <Text>Buscar</Text>
            </TouchableOpacity>

            {this.state.mensaje ? (
                <Text>{this.state.mensaje}</Text>
            ) : (
                <FlatList
                    data={this.state.resultados}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                            'SuPerfil', {mailUser: item.data.owner})}>
                            <Text>User Name: {item.data.userName}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    )
  }
}


export default Buscador