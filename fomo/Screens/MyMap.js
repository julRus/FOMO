import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  PermissionsAndroid,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  Linking
} from "react-native";
import MapView from "react-native-maps";

export default function MyMap(props) {
  const { skiddleEvents, businessEvents } = props.navigation.state.params;
  const events = skiddleEvents
    ? skiddleEvents.slice(0, skiddleEvents.length - 1)
    : businessEvents.slice(0, businessEvents.length - 1);

  return (
    <ImageBackground
      style={{
        width: "100%",
        height: "100%"
      }}
      source={require("../assets/bg.jpg")}
      resizeMode="cover"
      blurRadius={2}
    >
      <View style={styles.mapContainer}>
        <Button
          onPress={() => {
            console.log("Start", enteredLocation, "End");
            // Linking.openURL("https://google.com");
          }}
          title="Press Me"
        />
        <MapView
          zoomEnabled={true}
          style={styles.map}
          region={{
            latitude: 53.472101,
            longitude: -2.238568,
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
            {events.map(event => {
              return (
                <View key={event.id}>
                  <MapView.Marker
                    pinColor={"rgba(196, 73, 7, 0.9)"}
                    title={event.eventname}
                    coordinate={
                      event.venue.latitude !== null
                        ? {
                            latitude: event.venue.latitude,
                            longitude: event.venue.longitude
                          }
                        : {
                            latitude: "56",
                            longitude: "-4"
                          }
                    }
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
                          <Text style={styles.markerText}>
                            {event.eventname}
                          </Text>
                          <Text style={styles.markerLink}>Go to page</Text>
                        </View>
                      </TouchableOpacity>
                    </MapView.Callout>
                  </MapView.Marker>
                </View>
              );
            })}
          </View>
        </MapView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: "7%",
    alignSelf: "center",
    height: "98%",
    width: "99%"
  },

  map: {
    marginTop: "5%",
    alignSelf: "center",
    position: "absolute",
    // top: "20%",
    height: "95%",
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
