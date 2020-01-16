import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Button,
  Linking
} from "react-native";
import MapView from "react-native-maps";
import { Icon } from "react-native-elements";

import * as api from "../api";

export default function Event(props) {
  const [eventDetails, setEventDetails] = useState();
  const [loading, setLoading] = useState(true);

  const {
    event,
    id,
    eventCode,
    enteredLocation,
    keywords,
    age,
    gender,
    pickedAge,
    pickedGender
  } = props.navigation.state.params;
  let price = event.entryprice.split("£").join("");
  if (price === "") {
    price = "0.00";
  }

  useEffect(() => {
    api.fetchEventByEventId(id).then(data => {
      setEventDetails(data.results);
      setLoading(false);
    });
  }, []);

  function postEventHistory() {
    const userAge = age ? age : pickedAge;
    const userGender = gender ? gender : pickedGender;
    const eventLocation = `${eventDetails.venue.name}, ${eventDetails.venue.address}, ${eventDetails.venue.cityname}, ${eventDetails.venue.postcode}`;
    api.postEventHistory(
      userAge,
      userGender,
      eventCode,
      eventLocation,
      eventDetails.openingtimes.doorsopen
    );
  }

  if (loading)
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  else
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: "100%",
            height: "30%"
          }}
          source={{ uri: eventDetails.largeimageurl }}
        />
        <Text style={styles.eventText2}>{eventDetails.description}</Text>
        <View>
          <View style={styles.header}>
            <Text style={{ ...styles.date, ...styles.eventText }}>
              {new Date(eventDetails.date).toDateString()},{" "}
              {eventDetails.openingtimes.doorsopen} -
              {eventDetails.openingtimes.doorsclose}
            </Text>
            <Text style={{ ...styles.minAge, ...styles.eventText }}>
              Age Range: {eventDetails.MinAge}+
            </Text>
            <Text style={styles.eventText}>Entry Price: £{price}</Text>
            <Text style={styles.eventText}>{event.venue.address}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={postEventHistory}>
              <Text style={styles.buttonText}>Attend</Text>
            </TouchableOpacity>
          </View>
          <MapView
            zoomEnabled={true}
            style={styles.map}
            region={{
              latitude: event.venue.latitude,
              longitude: event.venue.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            maxZoomLevel={50}
            minZoomLevel={13}
            onMapReady={() => {
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
              ).then(granted => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  console.log("Location permission granted");
                } else {
                  alert("Location permission denied");
                }
              });
            }}
          >
            <View>
              <MapView.Marker
                pinColor={"rgba(196, 73, 7, 0.9)"}
                title={event.eventname}
                coordinate={{
                  latitude: event.venue.latitude,
                  longitude: event.venue.longitude
                }}
              >
                <MapView.Callout
                  tooltip={true}
                  onPress={() => {
                    Linking.openURL(event.link);
                  }}
                  title="Press Me"
                >
                  <TouchableOpacity>
                    <View style={styles.markerBubble}>
                      <Text style={styles.markerText}>{event.eventname}</Text>
                      <Text style={styles.markerLink}>Go to page</Text>
                    </View>
                  </TouchableOpacity>
                </MapView.Callout>
              </MapView.Marker>
            </View>
          </MapView>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black"
  },

  loading: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },

  header: {
    top: -120,
    margin: 10
  },

  buttonContainer: {
    flex: 1
  },

  button: {
    width: "40%",
    top: -100,
    marginLeft: 15,
    position: "absolute"
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    borderColor: "rgba(255, 205, 0, 0.8)",
    borderWidth: 1,
    borderRadius: 5,
    opacity: 0.9
  },

  eventHeading: {
    color: "white",
    fontSize: 16,
    textAlign: "center"
  },

  eventText: {
    color: "grey",
    margin: 2,
    fontSize: 20
  },

  eventText2: {
    color: "white",
    fontSize: 30,
    textAlign: "left",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    top: -130
  },

  description: {
    marginTop: 30,
    fontSize: 30
  },

  mapContainer: {
    marginTop: "7%",
    alignSelf: "center",
    height: "98%",
    width: "99%"
  },

  map: {
    marginTop: "30%",
    alignSelf: "center",
    position: "absolute",
    // top: "20%",
    height: "170%",
    width: "130%"
  },

  markerBubble: {
    color: "white",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 20
  },

  markerText: {
    textAlign: "center",
    fontSize: 16,
    color: "white"
  },

  markerLink: {
    textAlign: "center",
    fontSize: 16,
    color: "#1E90FF",
    textDecorationLine: "underline"
  }
});
