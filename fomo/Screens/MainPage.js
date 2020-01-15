import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import EventList from "./Components/EventList";
import * as api from "../api";

export default function MainPage(props) {
  const {
    keywords,
    navigator,
    enteredUsername,
    enteredLocation,
    pickedAge,
    pickedGender
  } = props.navigation.state.params;

  // console.log(props.navigation.state.params);
  // useEffect(() => {
  //   api.fetchUserByUsername(user).then(data => {
  //     setUserData(data);
  //     console.log(userData);
  //   });
  // }, []);

  function goToSettings() {
    navigator("SettingsPage", { enteredUsername });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToSettings}>
          <Text style={styles.settings}>settings</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.subHeader}>
        <Text style={styles.date}>{new Date().toDateString()}</Text>
        {/* <Text style={styles.changeLocation}>Change</Text> }
        <Text style={styles.location}>Manchester</Text>
      </View> */}
      {/* <Text style={styles.eventsTitle}>Events</Text> */}
      <EventList
        keywords={keywords}
        navigator={navigator}
        enteredLocation={enteredLocation}
        pickedAge={pickedAge}
        pickedGender={pickedGender}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    paddingBottom: 60,
    marginTop: 20
  },
  settings: {
    color: "white",
    marginHorizontal: 10
  },

  title: {
    color: "white",
    fontSize: 30,
    opacity: 0.7,
    textAlign: "center"
  },
  date: {
    color: "white",
    borderWidth: 0.4,
    textAlign: "center",
    top: -20
  },

  subHeader: {
    width: "100%",
    height: "15%",
    borderColor: "grey",
    borderWidth: 3
  },

  // changeLocation: {
  //   color: "white",
  //   alignSelf: "flex-end",
  //   top: 48,
  //   marginRight: 10
  // },

  location: {
    color: "white",
    fontSize: 40,
    opacity: 0.7,
    borderWidth: 0.4,
    textAlign: "center",
    top: -25
  }

  // eventsTitle: {
  //   color: "white",
  //   fontSize: 20,
  //   margin: 30
  // }
});
