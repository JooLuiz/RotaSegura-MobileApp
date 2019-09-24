import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from "react-native";
import BottomButtons from "./BottomButtons";
import { getDenuncias, setCurrentDenuncia } from "../actions/denuncias";

class DenunciaScreen extends React.Component {
  componentWillMount() {
    this.props.getDenuncias();
  }

  setDenunciaAndGo(tipoDenuncia) {
    this.props.setCurrentDenuncia(tipoDenuncia);
    this.props.navigation.navigate("DenunciasUsuario");
  }

  render() {
    if (!this.props.isAuthenticated) {
      return this.props.navigation.navigate("Login");
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={this.props.denuncias.filter(
            d => d.tipo_denuncia == this.props.currentTipoDenuncia.id
          )}
          ListEmptyComponent={
            <View style={styles.listItem}>
              <Text>Não há dados cadastrados para este tipo de denúncia</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.setDenunciaAndGo(item)}>
              <View style={styles.listItem}>
                <Text>{item.descricao}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
        <BottomButtons navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentTipoDenuncia: state.tipoDenuncias.currentTipoDenuncia,
  denuncias: state.denuncias.denuncias
});

const styles = StyleSheet.create({
  listItem: {
    height: Dimensions.get("window").height * 0.07,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connect(
  mapStateToProps,
  { getDenuncias, setCurrentDenuncia }
)(DenunciaScreen);
