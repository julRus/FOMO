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
  const {
    keywords,
    navigator,
    enteredLocation,
    pickedAge,
    pickedGender,
    userData
  } = props;

  const [skiddleEvents, setSkiddleEvents] = useState([]);
  const [longLatLocation, setLongLatLocation] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(userData, "<<<<use");
    api
      .fetchPostcodeInformation(
        enteredLocation ? enteredLocation : userData.location
      )
      .then(data => {
        api.fetchSkiddleEvents(data).then(data => {
          const { results } = data;
          const eventsByKeywords = keywords
            ? results.filter(event => {
                if (
                  event.EventCode === keywords[0] ||
                  event.EventCode === keywords[1] ||
                  event.EventCode === keywords[2] ||
                  event.EventCode === keywords[3]
                ) {
                  return event;
                }
              })
            : results;
          setSkiddleEvents(eventsByKeywords);
        });
        setIsLoading(false);
      });
  }, [userData]);

  // function viewMap() {
  //   props.navigator("MyMap", { skiddleEvents });
  // }

  function viewEvent(id, eventCode, event) {
    props.navigator("Event", {
      id,
      eventCode,
      keywords,
      enteredLocation,
      age: userData.age,
      pickedAge,
      pickedGender,
      gender: userData.gender,
      event
    });
  }

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );

  return (
    <View>
      <TouchableOpacity onPress={() => props.goToMap(skiddleEvents)}>
        <Text style={styles.mapButton}>Map View</Text>
      </TouchableOpacity>
      <FlatList
        data={skiddleEvents}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => viewEvent(item.id, item.EventCode, item)}
          >
            <View style={styles.events} key={item.id}>
              <ImageBackground
                style={{
                  width: "100%",
                  height: 120,
                  opacity: 0.7
                }}
                source={{ uri: item.largeimageurl }}
                blurRadius={3}
              >
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    alignSelf: "flex-end",
                    position: "absolute"
                  }}
                  source={{ uri: item.largeimageurl }}
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
    fontSize: 15,
    paddingRight: 105,
    textAlign: "center"
  },
  eventName: {
    color: "white",
    fontSize: 20,
    paddingRight: 135,
    textAlign: "right"
  },
  eventLocation: {
    color: "white",
    fontSize: 15,
    textAlign: "right",
    right: 135
  },
  mapButton: {
    color: "black",
    fontSize: 25,
    textAlign: "center",
    alignSelf: "center",
    width: "100%",
    backgroundColor: "rgba(255, 205, 0, 0.8)"
  },
  eventPrice: {
    color: "white",
    textAlign: "left",
    marginTop: 10,
    fontSize: 15
  }
});
