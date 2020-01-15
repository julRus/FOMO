import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground
} from "react-native";
import DialogInput from "react-native-dialog-input";

import * as api from "../api";

export default function SettingsPage(props) {
  const { enteredUsername } = props.navigation.state.params;

  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [postcode, setPostcode] = useState("");
  const [viewDialog, setViewDialog] = useState(false);

  useEffect(() => {
    api.fetchUserByUsername(enteredUsername).then(data => {
      setUserData(data);
    });
    console.log(userData);
  }, []);

  // const handleTextChangeUsername = enteredText => {
  //   setinputtedUsername(enteredText);
  // };
  // const handleFirstChangePassword = enteredText => {
  //   setFirstPassword(enteredText);
  // };
  // const handleSecondChangePassword = enteredText => {
  //   setSecondPassword(enteredText);
  // };
  // const patchUsername = () => {
  //   console.log(inputtedUsername);
  // };
  // const patchPassword = () => {
  //   if (enteredFirstPassword === enteredSecondPassword) {
  //     console.log(enteredFirstPassword);
  //   } else {
  //     console.log("Please make sure the passwords match");
  //   }
  // };

  function changeDetails(e) {
    console.log(e);
  }

  function patchUser(inputText) {
    setViewDialog(false);
    api.patchUserByUsername(userData, inputText);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Uername</Text>
        <Text style={styles.userDetail}>{userData.username}</Text>
        <View style={styles.button}>
          <Button
            title="Change Username"
            color="hotpink"
            onPress={() => setViewDialog(true)}
            disabled
          />
        </View>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Password</Text>
        <Text style={styles.userDetail}>******************</Text>
        <View style={styles.button}>
          <Button title="Change Password" color="grey" />
        </View>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Postcode</Text>
        <Text style={styles.userDetail}>{userData.location}</Text>
        <View style={styles.button}>
          <Button title="Change Postcode" color="hotpink" />
        </View>
      </View>
      <View>
        <Button title="Retake Quiz" color="hotpink" />
      </View>
      <DialogInput
        isDialogVisible={viewDialog}
        title={"USERNAME"}
        message={"Please Type your new Username here:"}
        hintInput={`E.G. ${userData.username}(101)`}
        submitInput={inputText => {
          patchUser(inputText);
        }}
        closeDialog={() => {
          this.showDialog(false);
        }}
      ></DialogInput>

      {/* <TextInput
        required
        placeholder="new username"
        value={inputtedUsername}
        onChangeText={handleTextChangeUsername}
      ></TextInput>
      <Button title="change username" onPress={patchUsername} />
      <TextInput
        placeholder="new password"
        value={enteredFirstPassword}
        onChangeText={handleFirstChangePassword}
      ></TextInput>
      <TextInput
        placeholder="re-type password"
        value={enteredSecondPassword}
        onChangeText={handleSecondChangePassword}
      ></TextInput>
      <Button title="change password" onPress={patchPassword} />
      <Button title="retake quiz" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  header: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
    padding: 10,
    textAlign: "center",
    borderBottomColor: "hotpink",
    borderBottomWidth: 1
  },
  label: {
    color: "white",
    fontSize: 25,
    margin: 10,
    marginBottom: 0,
    borderColor: "grey",
    borderBottomWidth: 0.2,
    width: "40%",
    borderRightWidth: 0.2,
    paddingRight: 20
  },
  labelContainer: {
    borderTopColor: "white",
    borderBottomColor: "white",
    borderWidth: 0.3
  },
  userDetail: {
    color: "grey",
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 15,
    borderColor: "grey",
    borderRightWidth: 0.2
  },
  button: {
    width: "40%",
    position: "absolute",
    left: "57%",
    top: "25%"
  }
});
