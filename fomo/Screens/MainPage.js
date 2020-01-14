import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import EventList from "./Components/EventList";

export default function MainPage(props) {
  const { keywords, familyFriendly, navigator } = props.navigation.state.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      {/* <View style={styles.subHeader}>
        <Text style={styles.settings}>settings</Text>
        <Text style={styles.date}>{new Date().toDateString()}</Text>
        {/* <Text style={styles.changeLocation}>Change</Text> }
        <Text style={styles.location}>Manchester</Text>
      </View> */}
      {/* <Text style={styles.eventsTitle}>Events</Text> */}
      <EventList
        keywords={keywords}
        ageRange={familyFriendly}
        navigator={navigator}
      />
      {/* <Event view={viewEvent} id={eventId} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    paddingBottom: 60
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
