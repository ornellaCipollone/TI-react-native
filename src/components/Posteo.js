import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { Component } from "react";
import firebase from "firebase";
import { db, auth } from "../firebase/config";
import { FontAwesome } from "@expo/vector-icons";

class Posteo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      cantidadLikes: this.props.dataPost.data.likes.length,
      cantidadComentarios: this.props.dataPost.data.comentarios.length,
      mostrarMensaje: false,
    };
  }

  componentDidMount() {
    if (this.props.dataPost.data.likes.includes(auth.currentUser.email)) {
      this.setState({
        like: true,
      });
    }
  }

  likear() {
    db.collection("posts")
      .doc(this.props.dataPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then((res) =>
        this.setState({
          like: true,
          cantidadLikes: this.props.dataPost.data.likes.length,
        })
      )
      .catch((e) => console.log(e));
  }

  sacarLike() {
    db.collection("posts")
      .doc(this.props.dataPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then((res) =>
        this.setState({
          like: false,
          cantidadLikes: this.props.dataPost.data.likes.length,
        })
      )
      .catch((e) => console.log(e));
  }

  borrarPosteo = () => {
    const postOwner = this.props.dataPost.data.owner;
    const currentUserEmail = auth.currentUser.email;
    if (postOwner === currentUserEmail) {
      db.collection("posts")
        .doc(this.props.dataPost.id)
        .delete()
        .then(() => {
          console.log("Post eliminado correctamente");
        })
        .catch((error) => {
          console.error("Error al eliminar el post:", error);
        });
    } else {
      this.setState({ mostrarMensaje: true });
    }
  };

  render() {
    return (
      <View style={styles.postContainer}>
        <View style={styles.userInfo}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("SuPerfil", {
                mailUser: this.props.dataPost.data.owner,
              })
            }
          >
            <Text style={styles.username}>
              Posteo de: {this.props.dataPost.data.owner}
            </Text>
          </TouchableOpacity>
          <Image
            style={styles.camera}
            source={{ uri: this.props.dataPost.data.foto }}
          />
        </View>

        <Text style={styles.postText}>
          {this.props.dataPost.data.textoPost}
        </Text>

        <View style={styles.iconBar}>
          {this.state.like ? (
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => this.sacarLike()}
            >
              <FontAwesome name="heart" color="red" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => this.likear()}
            >
              <FontAwesome name="heart-o" color="black" size={20} />
            </TouchableOpacity>
          )}

          <Text style={styles.likeCount}>{this.state.cantidadLikes} Likes</Text>

          <Text style={styles.commentCount}>
            {this.state.cantidadComentarios} Comentarios
          </Text>

          <TouchableOpacity
            style={styles.trashCount}
            onPress={() =>
              this.props.navigation.navigate("Comment", {
                id: this.props.dataPost.id,
              })
            }
          >
            <FontAwesome name="comment" color="#3498db" size={20} />
          </TouchableOpacity>

          {this.state.mostrarMensaje ? null : (
            <TouchableOpacity onPress={this.borrarPosteo}>
              <FontAwesome name="trash" size={20} color="red" />
            </TouchableOpacity>
          )}

          {this.state.mostrarMensaje ? (
            <View style={styles.errorMessageContainer}>
              <FontAwesome name="exclamation-circle" size={15} color="red" />
              <Text style={styles.errorMessage}>
                No tienes permiso para eliminar este post.
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    margin: 45,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  userInfo: {
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postText: {
    fontSize: 18,
    marginBottom: 10,
  },
  interactionBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeButton: {
    marginRight: 5,
  },
  likeCount: {
    fontSize: 14,
    color: "#555",
  },
  commentButton: {
    marginLeft: 8,
  },
  camera: {
    width: "100%",
    aspectRatio: 1, // Mantener una relación de aspecto cuadrada
    resizeMode: "cover",
    marginBottom: 10,
    marginTop: 5,
  },
  iconBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentCount: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
  },
  trashCount: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  errorMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8d7da",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorMessage: {
    color: "#721c24",
    marginLeft: 10,
  },
  smallErrorMessageContainer: {
    padding: 5,
  },
  smallErrorMessage: {
    fontSize: 12,
  },
  errorMessageContainerPost: {
    marginTop: 5,
    alignSelf: "stretch",
  },
});

export default Posteo;
