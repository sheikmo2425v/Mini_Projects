import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Button, View } from "react-native";

import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
const Pick_Location = ({ navigation }) => {
  // const route = useRoute();
  // const { langi, latii } = route.params;
  const [lang, setlang] = useState(79.2777077);
  const [lati, setlati] = useState(11.638085);

  useEffect(() => {}, []);
  const region = {
    latitude: 11.638085,
    longitude: 79.2777077,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  };
  const pick = (e) => {
    setlati(e["nativeEvent"]["coordinate"]["latitude"]);
    setlang(e["nativeEvent"]["coordinate"]["longitude"]);
  };
  const check = () => {
    navigation.navigate("add", { name: [lati, lang] });
  };

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={(e) => pick(e)}
      >
        <Marker
          coordinate={{
            longitude: lang,
            latitude: lati,
          }}
          pinColor="blue"
        />
      </MapView>
      <View style={styles.sv}>
        <Feather
          name="bookmark"
          size={45}
          color="#4F4557"
          onPress={() => check()}
        />
      </View>
    </>
  );
};

export default Pick_Location;
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  sv: {
    position: "absolute",
  },
});
