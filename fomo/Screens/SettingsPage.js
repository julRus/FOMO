import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function SettingsPage(props) {
  const { enteredUsername } = props.navigation.state.params;

  const [inputtedUsername, setinputtedUsername] = useState("");
  const [enteredFirstPassword, setFirstPassword] = useState("");
  const [enteredSecondPassword, setSecondPassword] = useState("");

  useEffect(() => {
    console.log(enteredUsername);
  });

  const handleTextChangeUsername = enteredText => {
    setinputtedUsername(enteredText);
  };
  const handleFirstChangePassword = enteredText => {
    setFirstPassword(enteredText);
  };
  const handleSecondChangePassword = enteredText => {
    setSecondPassword(enteredText);
  };
  const patchUsername = () => {
    console.log(inputtedUsername);
  };
  const patchPassword = () => {
    if (enteredFirstPassword === enteredSecondPassword) {
      console.log(enteredFirstPassword);
    } else {
      console.log("Please make sure the passwords match");
    }
  };
  return (
    <View>
      <TextInput
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
      <Button title="retake quiz" />
    </View>
  );
}
