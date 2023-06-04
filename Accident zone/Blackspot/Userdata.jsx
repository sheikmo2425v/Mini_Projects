import axios from "axios";

import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import Mapview, { Marker } from "react-native-maps";

const Userdata = () => {
  const [locaper, setlocaper] = useForegroundPermissions();
  const [cor, setcor] = useState({ latitude: 11.9416, longitude: 79.8083 });
  const region = {
    latitude: 11.9416,
    longitude: 79.8083,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  };
  const [x, setx] = useState(0);
  const [data, setdata] = useState([]);
  const [long, setlongs] = useState([]);
  const [lat, setlat] = useState([]);
  const [ls, setls] = useState([]);
  async function verifyper() {
    if (locaper.status === PermissionStatus.UNDETERMINED) {
      const requper = await setlocaper();
      return requper.granted;
    }
    if (locaper.status === PermissionStatus.DENIED) {
      Alert.alert("Insuffient permission");
    }
    return true;
  }
  useEffect(() => {
    if (x === 0) {
      axios.post("http://192.168.55.12:5000/getdata").then((res) => {
        setdata(res.data);

        const long = [];
        const lat = [];
        const ls = [];
        for (var x of res.data) {
          long.push(x[2]);
          lat.push(x[3]);
          ls.push(x[4]);
        }
        setlongs(long);
        setlat(lat);
        setls(ls);
      });
      setx(1);
    }
    async function fetchMyAPI() {
      try {
        const location = await getCurrentPositionAsync();
        setcor({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        for (var lo = 0; lo < long.length; lo++) {
          var n = parseFloat(long[lo]).toFixed(2);
          var x = parseFloat(lat[lo]).toFixed(2);
          var r = location.coords.latitude.toFixed(2);
          var k = location.coords.longitude.toFixed(2);
          var lr = ls[lo];
          var londi = (x - k).toFixed(2);
          var lats = (n - r).toFixed(2);

          if (londi <= 0.01 && lats <= 0.01) {
            if (lr === "vs") {
              const { sound } = await Audio.Sound.createAsync(
                require("../assets/verystrong.mp3")
              );
              console.log("Playing Sound");
              await sound.playAsync();
            } else if (lr === "strong") {
              const { sound } = await Audio.Sound.createAsync(
                require("../assets/medium.mp3")
              );
              console.log("Playing Sound");
              await sound.playAsync();
            } else {
              const { sound } = await Audio.Sound.createAsync(
                require("../assets/week.mp3")
              );
              console.log("Playing Sound");
              await sound.playAsync();
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }

    const intervalId = setInterval(() => {
      fetchMyAPI();
    }, 1000 * 5); // in milliseconds
    return () => clearInterval(intervalId);
  }, [cor]);

  async function playSound(d) {
    console.log("Loading Sound");
    if (d[4] === "vs") {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/verystrong.mp3")
      );
      console.log("Playing Sound");
      await sound.playAsync();
    } else if (d[4] === "strong") {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/medium.mp3")
      );
      console.log("Playing Sound");
      await sound.playAsync();
    } else {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/week.mp3")
      );
      console.log("Playing Sound");
      await sound.playAsync();
    }
  }

  const setcolor = (x) => {
    if (x === "vs") {
      return "red";
    } else if (x === "strong") {
      return "green";
    } else {
      return "blue";
    }
  };
  const checkin = (d) => {
    if (data.length !== 0) {
      return (
        <Marker
          key={d[0]}
          coordinate={{
            longitude: parseFloat(d[3]),
            latitude: parseFloat(d[2]),
          }}
          pinColor={setcolor(d[4])}
          onPress={() => {
            playSound(d);
          }}
        />
      );
    }
  };
  const map = cor ? (
    <Marker
      coordinate={cor}
      pinColor="yellow"
      onPress={() => {
        Alert.alert("Your location", JSON.stringify(cor));
      }}
    ></Marker>
  ) : (
    ""
  );
  return (
    <View style={styles.my}>
      <Mapview style={styles.map} initialRegion={region}>
        {map}

        {data.map((d) => {
          return checkin(d);
        })}
      </Mapview>
    </View>
  );
};

export default Userdata;
const styles = StyleSheet.create({
  my: {
    flex: 1,
  },
  btnText: {
    fontSize: 20,
    backgroundColor: "green",
    color: "white",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
});
