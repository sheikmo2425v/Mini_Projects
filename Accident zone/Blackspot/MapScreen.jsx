import Mapview, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import axios from "axios";

const MapScreen = () => {
  const isfocused = useIsFocused();
  const [data, setdata] = useState([]);
  useEffect(() => {
    if (isfocused) {
      axios.post("http://192.168.55.12:5000/getdata").then((res) => {
        setdata(res.data);
      });
    }
  }, [isfocused]);
  const region = {
    latitude: 11.9416,
    longitude: 79.8083,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  };
  const setcolor = (x) => {
    if (x === "vs") {
      return "red";
    } else if (x === "strong") {
      return "green";
    } else {
      return "blue";
    }
  };
  const x = (d) => {
    if (data.length !== 0) {
      return (
        <Marker
          key={d[0]}
          coordinate={{
            longitude: parseFloat(d[3]),
            latitude: parseFloat(d[2]),
          }}
          pinColor={setcolor(d[4])}
        />
      );
    }
  };
  return (
    <>
      <Mapview style={styles.map} initialRegion={region}>
        {data.map((d) => {
          return x(d);
        })}
      </Mapview>
    </>
  );
};

export default MapScreen;
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
