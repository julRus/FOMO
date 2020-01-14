import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

export default function HomeScreen(props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [authDetails, setAuthDetails] = useState({
    username: "",
    password: ""
  });

  const handleTextChangeUsername = enteredText => {
    setEnteredUsername(enteredText);
  };

  const handleTextChangePassword = enteredText => {
    setEnteredPassword(enteredText);
  };

  const authenticateUser = () => {
    setAuthDetails({ username: enteredUsername, password: enteredPassword });
    setEnteredUsername(""), setEnteredPassword("");
    props.navigator("MainPage", {
      username: enteredUsername,
      password: enteredPassword,
      navigator: props.navigator
    });
  };

  const goToSignInPage = () => {
    props.navigator("SignUp", { navigator: props.navigator });
  };

  return (
    <View style={StyleSheet.container}>
      <Text style={styles.logo}>FOMO</Text>
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="username"
          value={enteredUsername}
          onChangeText={handleTextChangeUsername}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          value={enteredPassword}
          onChangeText={handleTextChangePassword}
        ></TextInput>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.button} onPress={() => authenticateUser()}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>New to FOMO?</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.button} onPress={goToSignInPage}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1,
    backgroundColor: "black"
  },

  logo: {
    color: "white",
    fontSize: 40,
    width: "80%",
    marginTop: 10,
    padding: "5%",
    borderBottomColor: "white",
    borderBottomWidth: 0.5,
    textAlign: "center",
    alignSelf: "center"
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "100",
    padding: 0,
    marginVertical: 20,
    textAlign: "center"
  },

  inputContainer: {
    width: "90%",
    paddingBottom: 50,
    borderBottomColor: "white",
    borderBottomWidth: 0.5,
    alignSelf: "center"
  },

  input: {
    color: "white",
    fontSize: 15,
    padding: 5,
    width: 200,
    textAlign: "center",
    backgroundColor: "rgba(120, 120, 120, 0.6)",
    borderColor: "rgba(75, 75, 75, 1)",
    borderWidth: 1,
    borderRadius: 6,
    margin: 10,
    alignSelf: "center"
  },

  button: {
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "space-around",
    textAlign: "center"
  },

  buttonContainer: {
    borderColor: "rgba(196, 73, 7, 0.9)",
    borderWidth: 2,
    width: "30%",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 5
  }
});
