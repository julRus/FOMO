import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function SettingsPage(props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredFirstPassword, setFirstPassword] = useState("");
  const [enteredSecondPassword, setSecondPassword] = useState("");

  const handleTextChangeUsername = enteredText => {
    setEnteredUsername(enteredText);
  };

  const handleFirstChangePassword = enteredText => {
    setFirstPassword(enteredText);
  };
  const handleSecondChangePassword = enteredText => {
    setSecondPassword(enteredText);
  };

  const patchUsername = () => {
    console.log(enteredUsername);
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
        value={enteredUsername}
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
