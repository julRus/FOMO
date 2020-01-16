import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Picker,
  TextInput,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Image
} from "react-native";
import axios from "axios";
import Quiz from "./Components/Quiz";
import * as api from "../api";

export default function SignUpScreen(props) {
  const { navigator } = props.navigation.state.params;

  const [users, setUsers] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredLocation, setEnteredLocation] = useState("");
  const [pickedAge, setPickedAge] = useState("");
  const [pickedGender, setPickedGender] = useState("");

  useEffect(() => {
    api.fetchUsers().then(data => {
      setUsers(data);
    });
  }, []);

  const handleSetUsername = enteredText => {
    setEnteredUsername(enteredText);
  };

  const handleSetEmail = enteredText => {
    setEnteredEmail(enteredText);
  };

  const handleSetPassword = enteredText => {
    setEnteredPassword(enteredText);
  };

  const handleSetConfirmPassword = enteredText => {
    setEnteredConfirmPassword(enteredText);
  };

  const handleSetLocation = enteredText => {
    setEnteredLocation(enteredText.replace(/[ ]/g, ""));
  };

  const handleSetPickedAge = enteredText => {
    setPickedAge(enteredText);
  };

  const handleSetPickedGender = enteredText => {
    setPickedGender(enteredText);
  };

  const postUser = keywords => {
    if (keywords) {
      setViewModal(false);
      axios
        .post("https://fomo-api.herokuapp.com/register", {
          username: enteredUsername,
          password: enteredPassword,
          email: enteredEmail,
          location: enteredLocation,
          age: pickedAge,
          gender: pickedGender,
          option_1: keywords[0],
          option_2: keywords[1],
          option_3: keywords[2],
          option_4: keywords[3]
        })
        .then(({ data }) => {
          console.log(data);
        });
      navigator("MainPage", {
        keywords,
        navigator,
        enteredUsername,
        enteredLocation,
        pickedAge,
        pickedGender
      });
    }
  };

  const submitNewUser = () => {
    let validate = undefined;
    users.map(user => {
      if (enteredUsername === user.username) {
        validate = "This username is taken, please choose another";
      }
    });
    if (validate) {
      Alert.alert(validate);
    } else {
      if (enteredPassword !== enteredConfirmPassword) {
        Alert.alert("You're Passwords do not match, please try again");
        setEnteredPassword("");
        setEnteredConfirmPassword("");
      } else if (enteredUsername === "" || enteredLocation === "") {
        Alert.alert(
          `You have not filled in ALL the required feelds, please provide a ${
            enteredUsername === "" ? "Username" : "Password"
          }`
        );
      } else if (!enteredPassword.match(/[0-9, A-Z]/g)) {
        Alert.alert(
          "Password is too weak. Please use numbers, uppercase letters in your password."
        );
      } else {
        setViewModal(true);
      }
    }
  };

  SignUpScreen.navigationOptions = {
    headerStyle: { backgroundColor: "black" },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white"
  };

  return (
    <ImageBackground
      style={{
        width: "100%",
        height: "100%"
      }}
      source={require("../assets/bg.jpg")}
      resizeMode="cover"
      blurRadius={2}
    >
      <Quiz view={viewModal} navigator={navigator} postUser={postUser} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.viewContainer}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subTitle}>Username / Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your username(REQ)"
                value={enteredUsername}
                onChangeText={handleSetUsername}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                value={enteredEmail}
                onChangeText={handleSetEmail}
              />
              <Text style={styles.subTitle}>Password</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Password(REQ)"
                value={enteredPassword}
                onChangeText={handleSetPassword}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Re-Type Password(REQ)"
                value={enteredConfirmPassword}
                onChangeText={handleSetConfirmPassword}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.viewContainer}>
              <Text style={styles.subTitle}>Extra Details</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Postcode(REQ)"
                value={enteredLocation}
                onChangeText={handleSetLocation}
                autoCapitalize="words"
              />
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={pickedAge}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  mode="dropdown"
                  onValueChange={handleSetPickedAge}
                >
                  <Picker.Item label="Select your age range" value="" />
                  <Picker.Item label="Under 16 years" value="0-15" />
                  <Picker.Item label="16 - 25 years" value="16-25" />
                  <Picker.Item label="26 - 39 years" value="26-39" />
                  <Picker.Item label="40 - 65 years" value="40-65" />
                  <Picker.Item label="Over 65 years" value="66-99" />
                </Picker>
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={pickedGender}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  mode="dropdown"
                  onValueChange={handleSetPickedGender}
                >
                  <Picker.Item label="Select your gender" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
            </View>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.button} onPress={submitNewUser}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: "orange"
    paddingBottom: 100
  },

  viewContainer: {},

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

  subTitle: {
    textAlign: "center",
    fontSize: 16,
    color: "rgba(255, 204, 0, 0.8)"
  },

  inputContainer: {
    width: "90%",
    paddingBottom: 50,
    alignSelf: "center"
  },

  textInput: {
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

  pickerContainer: {
    color: "white",
    width: 260,
    backgroundColor: "rgba(180, 180, 180, 0.5)",
    borderColor: "rgba(75, 75, 75, 1)",
    borderWidth: 1,
    borderRadius: 6,
    margin: 10,
    alignSelf: "center"
  },

  picker: {
    // height: "30%",
    width: "95%",
    alignSelf: "center",
    color: "white",
    backgroundColor: "rgba(120, 120, 120, 0.6)",
    borderColor: "rgba(75, 75, 75, 1)",
    borderWidth: 1,
    borderRadius: 6
    // backgroundColor: "orange"
  },

  buttonContainer: {
    borderColor: "rgba(255, 204, 0, 0.8)",
    borderWidth: 2,
    width: "30%",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 5
  },

  button: {
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "space-around",
    textAlign: "center"
  }
});
