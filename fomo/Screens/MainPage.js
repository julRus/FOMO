import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import EventList from "./Components/EventList";
import { fetchUserByUsername } from "../api";

export default function MainPage(props) {
  const {
    keywords,
    navigator,
    enteredLocation,
    pickedAge,
    pickedGender,
    username
  } = props.navigation.state.params;

  // console.log(props.navigation.state.params);

  useEffect(() => {
    console.log("entered username", username);
    fetchUserByUsername(username)
      .then(data => {
        console.log("DATA HERE", data);
      })
      .catch(data => {
        console.log("DATA 2 HERE", data);
      });
  }, []);

  function goToSettings() {
    navigator("SettingsPage", { username });
  }

  function goToMap(skiddleEvents) {
    // console.log(skiddleEvents[0]);
    navigator("MyMap", { skiddleEvents, enteredLocation });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MAJOR EVENTS</Text>
        <Text style={styles.underTitle}>Large Business Events</Text>
      </View>
      {/* <View style={styles.subHeader}>
        <Text style={styles.date}>{new Date().toDateString()}</Text>
        {/* <Text style={styles.changeLocation}>Change</Text> }
        <Text style={styles.location}>Manchester</Text>
      </View> */}
      {/* <Text style={styles.eventsTitle}>Events</Text> */}
      <EventList
        navigator={navigator}
        keywords={keywords}
        enteredLocation={enteredLocation}
        pickedAge={pickedAge}
        pickedGender={pickedGender}
        goToMap={goToMap}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={goToSettings}>
          <Text style={styles.settings}>settings</Text>
        </TouchableOpacity>
      </View>
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

  header: {
    backgroundColor: "rgba(255, 204, 0, 0.8)",
    padding: 10
  },

  footer: {
    backgroundColor: "rgba(255, 204, 0, 0.8)",
    marginTop: "152%",
    width: "100%",
    position: "absolute"
  },

  settings: {
    marginHorizontal: 10
  },

  title: {
    fontSize: 30,
    opacity: 0.7,
    textAlign: "center",
    borderColor: "black",
    borderBottomWidth: 0.2
  },

  underTitle: {
    textAlign: "center",
    opacity: 0.5
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
