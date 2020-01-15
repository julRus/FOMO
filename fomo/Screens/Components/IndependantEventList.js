import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
  Modal
} from "react-native";
import * as api from "../../api";

export default function IndependantEventList(props) {
  const {
    keywords,
    navigator,
    enteredLocation,
    pickedAge,
    pickedGender
  } = props;

  const [businessEvents, setBusinessEvents] = useState([]);
  const [longLatLocation, setLongLatLocation] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.fetchPostcodeInformation(enteredLocation).then(data => {
      setLongLatLocation(data);
    });
    api.fetchBusinessEvents(longLatLocation).then(data => {
      const { events } = data;
      const eventsByKeywords = events.filter(event => {
        if (keywords) {
          if (
            event.event_type === keywords[0] ||
            event.event_type === keywords[1] ||
            event.event_type === keywords[2] ||
            event.event_type === keywords[3]
          ) {
            return event;
          }
        } else {
          return event;
        }
      });
      setBusinessEvents(eventsByKeywords);
      setIsLoading(false);
    });
  }, []);

  // function viewMap() {
  //   props.navigator("MyMap", { skiddleEvents });
  // }

  function viewEvent(id, eventCode) {
    props.navigator("Event", {
      id,
      eventCode,
      keywords,
      enteredLocation,
      pickedAge,
      pickedGender
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
      <TouchableOpacity onPress={() => props.goToMap(businessEvents)}>
        <Text style={styles.mapButton}>MAP</Text>
      </TouchableOpacity>
      <FlatList
        data={businessEvents}
        renderItem={({ item }) => (
          <TouchableOpacity
            keyExtractor={item => item.id.toString()}
            onPress={() => viewEvent(item.id, item.EventCode)}
          >
            <View style={styles.events} key={item.id}>
              <ImageBackground
                style={{
                  width: "100%",
                  height: 100,
                  opacity: 0.7
                }}
                source={{ uri: item.url }}
                blurRadius={3}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: "flex-end",
                    position: "absolute"
                  }}
                  source={{ uri: item.url }}
                ></Image>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventDate}>
                    {new Date(item.date).toDateString()},{" "}
                    {item.openingtimes.doorsopen} -{" "}
                    {item.openingtimes.doorsclose}
                  </Text>
                  <Text style={styles.eventName}>{item.event_name}</Text>
                  <Text style={styles.eventLocation}>
                    {item.venue.name}, {item.venue.postcode}
                  </Text>
                  <Text style={styles.eventPrice}>
                    {item.entryprice === "0" || item.entryprice === ""
                      ? "Free"
                      : `£${item.entryprice}`}
                  </Text>
                  <Text style={styles.eventAgeRange}>{`${item.minage}+`}</Text>
                </View>
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

  eventInfo: {
    backgroundColor: "black",
    paddingBottom: 11
  },

  eventDate: {
    color: "white",
    fontSize: 15,
    textAlign: "center"
  },
  eventName: {
    color: "white",
    fontSize: 20,
    paddingRight: 105,
    textAlign: "right"
  },
  eventLocation: {
    color: "white",
    fontSize: 15,
    textAlign: "right",
    right: 105
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
  eventAgeRange: {
    color: "white",
    fontSize: 20,
    opacity: 0.7
  },
  eventPrice: {
    color: "white",
    fontSize: 20,
    textAlign: "right"
  }
});