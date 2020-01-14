import React, { useState } from "react";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Delta from "./Components/Delta";

export default function MyMap(props) {
  const [directions, setDirections] = useState(null);
  const [directionStroke, setDirectionStroke] = useState(0);
  const { skiddleEvents } = props.navigation.state.params;

  // function markerClick(coordinate) {
  //   setDirections(coordinate);
  //   setDirectionStroke(2);
  // }

  return <View></View>;
  // <View style={styles.container}>
  //   <Text style={styles.logo}>FOMO</Text>
  //   <MapView
  //     style={styles.mapStyle}
  //     initialRegion={Delta([
  //       { latitude: 53.4824, longitude: -2.3406 },
  //       { latitude: 54, longitude: -2 },
  //       { latitude: 53, longitude: -2 }
  //     ])}
  //     maxZoomLevel={50}
  //   >
  //     <View>
  //       {skiddleEvents.map(event => {
  //         return (
  //           <View key={event.id}>
  //             <MapView.Marker
  //               key={event.id}
  //               coordinate={{
  //                 latitude: event.venue.latitude,
  //                 longitude: event.venue.longitude
  //               }}
  //               title={event.description}
  //               description={new Date(event.date).toDateString()}
  //               onPress={() =>
  //                 markerClick({
  //                   latitude: event.venue.latitude,
  //                   longitude: event.venue.longitude
  //                 })
  //               }
  //             />
  //             <MapViewDirections
  //               origin={{ latitude: 53.4824, longitude: -2.3406 }}
  //               destination={directions}
  //               apikey="AIzaSyBkG5l0zSr-L_NocMKA4KaBQacBZaJlX_A"
  //               strokeWidth={directionStroke}
  //               strokeColor="hotpink"
  //             ></MapViewDirections>
  //           </View>
  //         );
  //       })}
  //     </View>
  //     {/* <Marker
  //       style={styles.container}
  //       title="FED HOUSE"
  //       description="12 Dec"
  //       coordinate={{ latitude: 53.48627, longitude: -2.24012 }}
  //     ></Marker>
  //     <Marker
  //       style={styles.container}
  //       title="FED HOUSE"
  //       description="12 Dec"
  //       coordinate={{ latitude: 53.68627, longitude: -2.24012 }}
  //     ></Marker> */}
  //   </MapView>
  // </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    backgroundColor: "black",
    width: "100%"
  },
  calloutText: {
    fontSize: 20,
    backgroundColor: "black"
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
