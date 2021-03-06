import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import EventList from "./Components/EventList";

import IndependantMainPage from "./IndependantMainPage";
import * as api from "../api";

export default function MainPage(props) {
  const {
    keywords,
    navigator,
    enteredLocation,
    pickedAge,
    pickedGender,
    enteredUsername
  } = props.navigation.state.params;

  const [viewIndependantEvents, setViewIndependantEvents] = useState(false);
  const [userData, setUserData] = useState({});

  // console.log(props.navigation.state.params);

  useEffect(() => {
    api
      .fetchUserByUsername(enteredUsername)
      .then(data => {
        setUserData(data);
        console.log(data, "<<<<dat");
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
        userData={userData}
      />
      <View style={styles.header}>
        <View style={styles.underTitleButtons}>
          <TouchableOpacity>
            <Text style={styles.underTitle}>Large Business Events</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => independantEventsViewer(true)}>
            <Text style={styles.underTitle2}>Independant Events</Text>
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
        userData={userData}
      />
      <View style={styles.footer}>
        {/* <TouchableOpacity onPress={goToSettings}>
          <Text style={styles.settings}>settings</Text>
        </TouchableOpacity> */}
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
    padding: 10,
    marginTop: 10
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

  underTitleButtons: {
    justifyContent: "center",
    flexDirection: "row"
  },

  underTitle: {
    textAlign: "center",
    opacity: 0.5,
    marginHorizontal: 20,
    // borderRightWidth: 3,
    borderColor: "lightgreen",
    borderBottomWidth: 3,
    right: 60,
    width: "120%"
  },

  underTitle2: {
    textAlign: "center",
    opacity: 0.5,
    marginHorizontal: 20,
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
