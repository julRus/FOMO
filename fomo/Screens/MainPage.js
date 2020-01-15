import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import EventList from "./Components/EventList";

import { fetchUserByUsername, fetchPostcodeInformation } from "../api";
import IndependantMainPage from "./IndependantMainPage";
import { fetchUserByUsername } from "../api";
import { fetchUserByUsername, fetchPostcodeInformation } from "../api";

export default function MainPage(props) {
  const {
    keywords,
    navigator,
    enteredLocation,
    pickedAge,
    pickedGender,
    username
  } = props.navigation.state.params;

  const [viewIndependantEvents, setViewIndependantEvents] = useState(false);

  // console.log(props.navigation.state.params);

  useEffect(() => {
    fetchUserByUsername(username)
      .then(data => {
        fetchPostcodeInformation(data.location);
      })
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

  function independantEventsViewer(bool) {
    setViewIndependantEvents(bool);
  }

  return (
    <View style={styles.container}>
      <IndependantMainPage
        view={viewIndependantEvents}
        navigator={navigator}
        keywords={keywords}
        enteredLocation={enteredLocation}
        pickedAge={pickedAge}
        pickedGender={pickedGender}
        goToMap={goToMap}
        independantEventsViewer={independantEventsViewer}
      />
      <View style={styles.header}>
        <Text style={styles.title}>MAJOR EVENTS</Text>
        <View style={styles.underTitleButtons}>
          <TouchableOpacity>
            <Text style={styles.underTitle}>Large Business Events</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => independantEventsViewer(true)}>
            <Text style={styles.underTitle}>Independant Events</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "rgba(255, 204, 0, 1)",
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
    fontWeight: "300",
    textAlign: "center",
    borderColor: "black",
    borderBottomWidth: 0.2
  },

  underTitleButtons: {
    justifyContent: "center",
    flexDirection: "row"
  },

  underTitle: {
    textAlign: "center",
    opacity: 0.5,
    marginHorizontal: 20,
    borderColor: "black",
    borderRightWidth: 0.2,
    right: 20,
    width: "100%"
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
