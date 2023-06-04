import { useState, useCallback, useEffect } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import { TextInput, Text } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

const Adddata = ({ navigation }) => {
  const route = useRoute();

  const [long, setlong] = useState("sdf");
  const [lat, setlat] = useState("sdf");
  useEffect(() => {
    if (route.params !== undefined) {
      console.log(route);
      setlong(route.params.name[0]);
      setlat(route.params.name[1]);
    }
  });

  console.log([lat, long]);
  const [locaper, setlocaper] = useForegroundPermissions();

  const [img, setimg] = useState();
  const [place, setplace] = useState("");

  const [set, onChange] = useState("");
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: "Lite", value: "lite" },
    { label: "Strong", value: "strong" },
    { label: "Very Strong", value: "vs" },
  ]);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);
  // useEffect(() => {
  //   getlocation(0);
  // });
  const checking = () => {
    if (place !== "" && long !== "" && lat !== "" && set !== "") {
      const value = { place: place, long: long, lat: lat, set: set };
      console.log(value);
      axios.post("http://192.168.55.12:5000/storedata", value).then((res) => {
        setplace("");
        setlong("");
        setlat("");
        onChange("");
        Alert.alert("Stored", "Place added");
        navigation.navigate("after", { name: res.data[1] });
      });
    }
  };

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
  const getlocation = async (e) => {
    const pers = await verifyper();
    if (pers) {
      const location = await getCurrentPositionAsync();

      console.log(location.coords.latitude, location.coords.longitude);

      setlong(location.coords.latitude);
      setlat(location.coords.longitude);
    } else {
      Alert.alert("We need permission for access your location");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            label="Enter place"
            value={place}
            onChangeText={(e) => setplace(e)}
          />
        </View>

        <View style={styles.pick}>
          <Button
            onPress={() => getlocation(0)}
            title="Pick current Location"
            color={"black"}
          />
        </View>
        <View style={styles.pick}>
          <Button
            onPress={() => navigation.navigate("PickLocation")}
            title="Pick Location on map"
            color={"black"}
          />
        </View>
        <View style={styles.dropdownGender}>
          <DropDownPicker
            style={styles.dropdown}
            open={genderOpen}
            value={genderValue} //genderValue
            items={gender}
            setOpen={setGenderOpen}
            setValue={setGenderValue}
            setItems={setGender}
            placeholder="Select Type of Danger"
            placeholderStyle={styles.placeholderStyles}
            onChangeValue={onChange}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        <View style={styles.logbut}>
          <Button onPress={() => checking()} title="Add data" color={"black"} />
        </View>
      </View>
    </>
  );
};

export default Adddata;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#393646",
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#F4EEE0",
    marginLeft: "2%",
    marginRight: "2%",
    height: "6%",
    marginTop: "10%",
  },
  logbut: {
    marginTop: "8%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 125,
  },
  pick: {
    marginTop: "8%",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownGender: {
    marginTop: 45,
    marginHorizontal: 10,
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#F4EEE0",
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 50,
    backgroundColor: "lightgrey",
  },
  placeholderStyles: {
    color: "grey",
  },
});
