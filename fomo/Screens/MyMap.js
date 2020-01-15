import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PermissionsAndroid,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  Linking
} from "react-native";
import MapView from "react-native-maps";

export default function MyMap(props) {
  const { skiddleEvents } = props.navigation.state.params;
  const events = skiddleEvents.slice(0, 1);

  return (
    <View>
      <View style={styles.mapContainer}>
        <Button
          onPress={() => {
            // console.log("Start", events, "End");
            Linking.openURL("https://google.com");
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
            {skiddleEvents.map(event => {
              return (
                <View key={event.id}>
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
                        <Text style={styles.markerText}>{event.eventname}</Text>
                      </TouchableOpacity>
                    </MapView.Callout>
                  </MapView.Marker>
                </View>
              );
            })}
          </View>
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: "5%",
    alignSelf: "center",
    height: "95%",
    width: "90%",
    backgroundColor: "rgba(25,25,25,1)"
    // backgroundColor: "orange"
  },

  map: {
    marginTop: "5%",
    alignSelf: "center",
    position: "absolute",
    // top: "20%",
    height: "95%",
    width: "90%"
  },

  markerText: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 10,
    borderRadius: 200,
    backgroundColor: "orange"
  }
});
