import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import EventList from "./Components/EventList";
import * as api from "../api";

export default function MainPage(props) {
  const { username, password } = props.navigation.state.params;
  const [storedFamily, setFamily] = useState("");
  const [storedOption_1, setOption_1] = useState("");
  const [storedOption_2, setOption_2] = useState("");
  const [storedOption_3, setOption_3] = useState("");
  const [storedOption_4, setOption_4] = useState("");
  const [storedLocation, setLocation] = useState("");

  useEffect(() => {
    api.fetchLoginToken(username, password).then(data => {
      console.log("Token", data.access_token);
      if (data.access_token) {
        api
          .fetchUserDetails(username)
          .then(data => {
            const {
              family,
              option_1,
              option_2,
              option_3,
              option_4,
              location
            } = data;
            setFamily(family);
            setOption_1(option_1);
            setOption_2(option_2);
            setOption_3(option_3);
            setOption_4(option_4);
            setLocation(location);
          })
          .then(() => {
            // console.log(
            //   "Here",
            //   storedFamily,
            //   storedOption_1,
            //   storedOption_2,
            //   storedOption_3,
            //   storedOption_4,
            //   storedLocation
            // );
            api.fetchEventsByType(storedOption_1);
          });
      } else {
        console.log("No access token");
      }
    });
  }, []);

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
      {/* <EventList
        keywords={keywords}
        ageRange={familyFriendly}
        navigator={navigator}
      /> */}
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
