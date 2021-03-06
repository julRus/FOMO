import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Modal
} from "react-native";

import arrayOfInterests from "./interest";
import ConfirmInterests from "./ConfirmInterests";

let items = [];

export default function Quiz(props) {
  const { user, navigator } = props;
  const [interests, setInterests] = useState([]);
  const [keywords, setKeywords] = useState(items);
  const [viewConfirmPage, setViewConfirmPage] = useState(false);
  const [viewFamilyFriendlyPage, setViewFamilyFriendlyPage] = useState(false);
  const [familyFriendly, setFamilyFriendly] = useState();

  useEffect(() => {
    setInterests(arrayOfInterests);
  });

  function handleInterestPress(item) {
    interests.map(interest => {
      if (interest.key === item && interest.opacity === 1 && items.length < 4) {
        items = [...items, item];
        interest.opacity = 0.2;
        setKeywords([]);
        if (items.length === 4) {
          setKeywords(items);
          setViewConfirmPage(true);
        }
      } else if (interest.key === item && interest.opacity === 0.2) {
        setKeywords([]);
        items.splice(items.indexOf(item), 1);
        interest.opacity = 1;
      }
    });
  }

  function resetInterests() {
    items.splice(0, 4);
    setViewConfirmPage(false);
    interests.map(interest => {
      if (interest.opacity === 0.2) {
        return (interest.opacity = 1);
      }
    });
  }

  function confirm() {
    setViewConfirmPage(false);
    props.postUser(keywords);
  }

  function navToMainPage(ageRange) {
    props.navigator("MainPage", {
      ageRange,
      keywords,
      navigator,
      user
    });
    // this function for final axios post for user creation
  }

  return (
    <View>
      <Modal visible={props.view} animationType="slide">
        <Text style={styles.title}>
          What are your interests? {`Choose ${4 - items.length}`}
        </Text>
        <FlatList
          style={styles.choices}
          data={interests}
          renderItem={({ item }) => (
            <View
              style={{
                opacity: item.opacity,
                flex: 1,
                height: 210,
                margin: 5
              }}
            >
              <ImageBackground style={styles.images} source={item.img}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleInterestPress(item.key)}
                >
                  <Text style={styles.text}>{item.key}</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          )}
          numColumns={2}
        />
        <ConfirmInterests
          view={viewConfirmPage}
          cancel={resetInterests}
          confirm={confirm}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60
  },
  title: {
    color: "white",
    fontSize: 20,
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "black"
  },
  choices: {
    backgroundColor: "black"
  },
  button: {
    height: 230,
    width: 200,
    marginTop: 10,
    backgroundColor: "black",
    opacity: 0.5,
    top: -10
  },
  images: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  text: {
    fontSize: 20,
    margin: 20,
    paddingRight: 10,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
    color: "white"
  }
});
