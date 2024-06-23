import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import Posteo from "../components/Posteo";

class SuPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      susPosts: [],
      suInfo: {},
      mailUser: this.props.route.params.mailUser,
    };
  }

  componentDidMount() {
    console.log(this.props.route.params);
    
    let perfil = this.state.mailUser;
    
    db.collection("posts")
      .where("owner", "==", perfil)
      .onSnapshot((docs) => {
        
        let posts = [];
        
        docs.forEach((doc) =>
          posts.push({
            id: doc.id,
            data: doc.data(),
          })
        );
        this.setState({
          susPosts: posts,
        });
      });
   
      db.collection("users")
      .where("owner", "==", this.state.mailUser)
      .onSnapshot((doc) => {
        doc.forEach((doc) =>
          this.setState({
            id: doc.id,
            suInfo: doc.data(),
          })
        );
      });
  }

  render() {
    console.log(this.state.suInfo);
    console.log(this.state.susPosts);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.profileInfo}>
          <Image style={styles.profileImage} source={{ uri: this.state.suInfo.profileImage || 'https://via.placeholder.com/150' }} />
          <Text style={styles.username}>{this.state.suInfo.userName}</Text>
          <Text style={styles.bio}>Biografía: {this.state.suInfo.bio}</Text>
          <Text style={styles.postsCount}>Cantidad de posts: {this.state.susPosts.length}</Text>
        </View>

        <Text style={styles.sectionTitle}>Posteos:</Text>
        <FlatList
          style={styles.postsList}
          data={this.state.susPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Posteo dataPost={item} navigation={this.props.navigation} />
          )}
        />

        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.navigate("TabNav")}>
          <Text style={styles.backButtonText}>Volver a Home</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE',
    padding: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  postsCount: {
    fontSize: 16,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 45,
  },
  postsList: {
    marginTop: 10,
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

export default SuPerfil;
