import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import Posteo from '../components/Posteo'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            posteos : []
        }
    }

    componentDidMount(){
        //Traer los post de la DB
        db.collection('posts')
        .orderBy('createdAt', 'desc')
        .limit(10)
        .onSnapshot(
            docs =>{
                
                let posts = [];
                
                docs.forEach( doc => {
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
    }
              
    render() {
    return (
        <ScrollView>
            <FlatList
                data={this.state.posteos}
                keyExtractor={ item => item.id.toString() }
                renderItem={ ({item}) => <Posteo dataPost={item}/> }
            />
        </ScrollView>
    )
  }
}

export default Home

