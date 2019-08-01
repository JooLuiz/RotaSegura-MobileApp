import React from "react";
import { connect } from "react-redux";
import { agoraVai } from "../actions/test";
import { View, Text, Button } from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  openModal = () => {
    this.props.agoraVai("mano sera q vai");
  };

  closeModal = () => {
    this.props.agoraVai("Teste 2");
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button title="Open Modal" onPress={() => this.openModal()} />
        <Button title="Close Modal" onPress={() => this.closeModal()} />

        <View style={{ flex: 1, position: "absolute", bottom: 0 }}>
          <Button
            title="Menu"
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Button
            title="Home"
            onPress={() => this.props.navigation.navigate("Mapa")}
          />
          <Button
            title="Profile"
            onPress={() => this.props.navigation.navigate("Profile")}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  msg: state.errors.msg,
  status: state.errors.status
});

export default connect(
  mapStateToProps,
  { agoraVai }
)(HomeScreen);
