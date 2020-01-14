import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Modal
} from "react-native";

export default function FamilyFriendlyPage(props) {
  return (
    <Modal style={styles.container} visible={props.view} animationType="fade">
      <Text style={styles.background}></Text>
      <Text style={styles.title}>
        Would you like to include family friendly events in your feed?
      </Text>
      <TouchableOpacity>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Yes"
              color="hotpink"
              onPress={() => props.confirm("<")}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="No"
              color="grey"
              onPress={() => props.confirm(">")}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    margin: 20,
    top: 70,
    elevation: 20,
    backgroundColor: "black",
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
