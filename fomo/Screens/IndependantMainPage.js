import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  YellowBox
} from "react-native";
import EventList from "./Components/EventList";
import IndependantEventList from "./Components/IndependantEventList";

export default function IndependantMainPage(props) {
  YellowBox.ignoreWarnings([
    "Warning: Failed child context type: Invalid child context `virtualizedCell.cellKey` of type `number` supplied to `CellRenderer`, expected `string`"
  ]);

  const {
    keywords,
    navigator,
    enteredUsername,
    enteredLocation,
    pickedAge,
    pickedGender,
    independantEventsViewer,
    userData
  } = props;

  function goToSettings() {
    navigator("SettingsPage", { enteredUsername });
  }

  function goToMap(businessEvents) {
    // console.log(skiddleEvents[0]);
    navigator("MyMap", { businessEvents });
    independantEventsViewer(false);
  }

  function gotToEvent(bool) {
    independantEventsViewer(bool);
  }

  return (
    <Modal visible={props.view} animationType="fade">
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.underTitleButtons}>
            <TouchableOpacity>
              <Text
                style={styles.underTitle}
                onPress={() => independantEventsViewer(false)}
              >
                Large Business Events
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
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

        <IndependantEventList
          navigator={navigator}
          keywords={keywords}
          enteredLocation={enteredLocation}
          pickedAge={pickedAge}
          pickedGender={pickedGender}
          goToMap={goToMap}
          gotToEvent={gotToEvent}
          userData={userData}
        />
        <View style={styles.footer}>
          {/* <TouchableOpacity onPress={goToSettings}>
            <Text style={styles.settings}>settings</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    paddingBottom: 60,
    marginTop: -5
  },

  header: {
    backgroundColor: "rgba(255, 204, 0, 0.8)",
    marginTop: 10,
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
    width: "120%",
    fontWeight: "300",
    textAlign: "center",
    alignSelf: "center",
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
    right: 20,
    width: "100%"
  },

  underTitle2: {
    textAlign: "center",
    opacity: 0.5,
    marginHorizontal: 20,
    right: 20,
    width: "120%",
    borderBottomColor: "lightgreen",
    borderBottomWidth: 3
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
