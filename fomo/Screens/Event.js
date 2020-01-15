import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  PermissionsAndroid,
  Button,
  Linking
} from "react-native";
import MapView from "react-native-maps";

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
    pickedAge,
    pickedGender
  } = props.navigation.state.params;
  let price = event.entryprice.split('£').join('')
  if (price === "") {
    price = '0.00'
  }

  useEffect(() => {
    api.fetchEventByEventId(id).then(data => {
      setEventDetails(data.results);
      setLoading(false);
    });
  }, []);

  function postEventHistory() {
    const eventLocation = `${eventDetails.venue.name}, ${eventDetails.venue.address}, ${eventDetails.venue.cityname}, ${eventDetails.venue.postcode}`;
    api.postEventHistory(
      pickedAge,
      pickedGender,
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
        <ImageBackground
          style={{
            width: "100%",
            height: "100%"
          }}
          source={{ uri: eventDetails.largeimageurl }}
          blurRadius={2}
        >
          <View>
            <TouchableOpacity style={styles.button} onPress={postEventHistory}>
              <Text style={styles.buttonText}>Attend</Text>
            </TouchableOpacity>

            <Text style={{ ...styles.date, ...styles.eventText }}>
              {new Date(eventDetails.date).toDateString()},{" "}
              {eventDetails.openingtimes.doorsopen} -
              {eventDetails.openingtimes.doorsclose}
            </Text>
            <Text style={{ ...styles.minAge, ...styles.eventText }}>
              Age Range: {eventDetails.MinAge}+
            </Text>
            <Text style={styles.eventText}>
              Entry Price: £{price}
            </Text>
            <Text></Text>
            <Text style={styles.eventHeading}>Details:</Text>
            <Text style={styles.eventText2}>{eventDetails.description}</Text>
            <Text style={styles.eventHeading}>Address:</Text>
            <Text style={styles.eventText2}>{event.venue.address}</Text>
            {/* <Button
              onPress={() => {
                console.log(event);
                // Linking.openURL("https://google.com");
              }}
              title="Press Me"
            /> */}
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
        </ImageBackground>
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

  button: {
    width: "90%",
    alignSelf: "center",
    position: "absolute",
    top: 20
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "hotpink",
    opacity: 0.9
  },

  date: {
    marginTop: 60
  },

  eventHeading: {
    color: "white",
    fontSize: 16,
    textAlign: "center"
  },

  eventText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5
  },

  eventText2: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15
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
    marginTop: "95%",
    alignSelf: "center",
    position: "absolute",
    // top: "20%",
    height: "100%",
    width: "90%"
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
