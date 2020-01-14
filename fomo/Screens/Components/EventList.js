import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image
} from "react-native";
import * as api from "../../api";

export default function EventList(props) {
  const [skiddleEvents, setSkiddleEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  api.fetchSkiddleEvents().then(data => {
    const { keywords, ageRange } = props;
    const { results } = data;
    const eventsByKeywords = results.filter(event => {
      if (
        event.EventCode === keywords[0] ||
        event.EventCode === keywords[1] ||
        event.EventCode === keywords[2] ||
        event.EventCode === keywords[3]
      ) {
        return event;
      }
    });
    setSkiddleEvents(eventsByKeywords);
    setIsLoading(false);
  });

  // function viewMap() {
  //   props.navigator("MyMap", { skiddleEvents });
  // }

  function viewEvent(id) {
    props.navigator("Event", { id });
  }

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  return (
    <View>
      <TouchableOpacity onPress={null}>
        <Text style={styles.mapButton}>MAP > > ></Text>
      </TouchableOpacity>
      <FlatList
        data={skiddleEvents}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id} onPress={() => viewEvent(item.id)}>
            <View style={styles.events} key={item.id}>
              <ImageBackground
                style={{
                  width: "100%",
                  height: 100,
                  opacity: 0.7
                }}
                source={{ uri: item.largeimageurl }}
                blurRadius={3}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: "flex-end",
                    position: "absolute"
                  }}
                  source={{ uri: item.imageurl }}
                ></Image>
                <Text style={styles.eventDate}>
                  {new Date(item.date).toDateString()},{" "}
                  {item.openingtimes.doorsopen} - {item.openingtimes.doorsclose}
                </Text>
                <Text style={styles.eventName}>{item.eventname}</Text>
                <Text style={styles.eventLocation}>
                  {item.venue.name}, {item.venue.postcode}
                </Text>
                <Text style={styles.eventPrice}>
                  {item.entryprice === "0.00" ? "Free" : `${item.entryprice}`}
                </Text>
                <Text style={styles.eventAgeRange}>
                  {item.minage ? "All" : `${item.minage}+`}
                </Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        )}
        numColumns={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  loading: {
    color: "white",
    textAlign: "center",
    top: -40
  },
  eventDate: {
    color: "white",
    fontSize: 10,
    textAlign: "center"
  },
  eventName: {
    color: "white",
    fontSize: 15,
    paddingRight: 135,
    textAlign: "right"
  },
  eventLocation: {
    color: "white",
    fontSize: 10,
    textAlign: "right",
    right: 135
  },
  mapButton: {
    color: "lightblue",
    fontSize: 25,
    textAlign: "center",
    alignSelf: "center",
    width: "99%",
    borderColor: "lightblue",
    borderWidth: 1,
    borderRadius: 5
  },
  // eventAgeRange: {
  //   color: "white",
  //   fontSize: 20,
  //   textAlign: "right",
  //   backgroundColor: "black",
  //   opacity: 0.7
  // },
  eventPrice: {
    color: "white",
    textAlign: "right"
  }
});
