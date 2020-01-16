import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { fetchLoginToken } from "../api";

export default function HomeScreen(props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [authDetails, setAuthDetails] = useState({
    username: "",
    password: ""
  });
  const [keywords, setKeywords] = useState([]);

  const handleTextChangeUsername = enteredText => {
    setEnteredUsername(enteredText);
  };

  const handleTextChangePassword = enteredText => {
    setEnteredPassword(enteredText);
  };

  const authenticateUser = () => {
    setAuthDetails({ username: enteredUsername, password: enteredPassword });
    setEnteredUsername(""), setEnteredPassword("");

    fetchLoginToken(enteredUsername, enteredPassword)
      .then(data => {
        if (data.access_token) {
          props.navigator("MainPage", {
            enteredUsername,
            password: enteredPassword,
            navigator: props.navigator
          });
        }
      })
      .catch(() => {
        Alert.alert("Incorrect username and/or password");
      });
  };

  const goToSignInPage = () => {
    props.navigator("SignUp", { navigator: props.navigator });
  };

  return (
    <View style={StyleSheet.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
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
    width: "40%",
    height: "23%",
    alignSelf: "center",
    marginTop: 50
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "100",
    padding: 0,
    marginVertical: 20,
    alignSelf: "center",
    textAlign: "center",
    borderColor: "white",
    borderTopWidth: 0.5,
    width: "80%",
    paddingTop: 20
  },

  inputContainer: {
    width: "90%",
    paddingBottom: 50,
    alignSelf: "center"
  },

  input: {
    color: "white",
    fontSize: 15,
    padding: 5,
    width: 260,
    textAlign: "center",
    backgroundColor: "rgba(180, 180, 180, 0.5)",
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
    width: "100%",
    justifyContent: "space-around",
    textAlign: "center"
  },

  buttonContainer: {
    borderColor: "rgba(255, 204, 0, 0.8)",
    borderWidth: 2,
    width: 100,
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 5,
    marginBottom: -20
  }
});
