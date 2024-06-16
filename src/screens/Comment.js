import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../firebase/config'


class Comment extends Component {
    constructor(props){
        super(props)
        this.state =  {
            NuevoComentario: "",
            id: "",
            data: {},
        }
}
    componentDidMount(){
        db.collection("posts")
        .doc(this.props.route.params.id)
        .onSnapshot(doc=> {
            this.setState({id:doc.id,data:doc.data()})
        })
    }




  render() {
    return (
      <View>
        <Text>Comment</Text>
      </View>
    )
  }
}

export default Comment