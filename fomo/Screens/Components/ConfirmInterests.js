import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Modal
} from "react-native";

export default function ConfirmInterests(props) {
  return (
    <View style={styles.container}>
      <Modal visible={props.view} animationType="slide">
        <Text style={styles.background}></Text>
        <Text style={styles.title}>Confirm these interests?</Text>
        <TouchableOpacity>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Choose Again"
                color="hotpink"
                onPress={props.cancel}
              />
            </View>
            <View style={styles.button}>
              <Button title="Confirm" color="grey" onPress={props.confirm} />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    margin: 20,
    top: 70,
    elevation: 20,
    paddingVertical: 180,
    paddingHorizontal: 50,
    borderRadius: 6,
    opacity: 0.8
  },

  background: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    position: "absolute"
  },

  title: {
    fontSize: 20,
    marginTop: 260,
    color: "white",
    textAlign: "center"
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 30
  },
  button: {
    width: 120,
    textAlign: "center"
  }
});
