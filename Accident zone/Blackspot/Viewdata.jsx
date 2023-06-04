import { useRoute } from "@react-navigation/core";
import { useLayoutEffect } from "react";
import { useState, useCallback } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

const Viewdata = ({ navigation }) => {
  const route = useRoute();
  const [id, setid] = useState(route.params.data[0]);
  const [place, setplace] = useState(route.params.data[1]);
  const [long, setlong] = useState(route.params.data[2]);
  const [lat, setlat] = useState(route.params.data[3]);
  const [set, onChange] = useState(route.params.data[4]);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(route.params.data[4]);
  const [gender, setGender] = useState([
    { label: "Lite", value: "lite" },
    { label: "Strong", value: "strong" },
    { label: "Very Strong", value: "vs" },
  ]);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);
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
  return (
    <>
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            label="Enter place"
            right={<TextInput.Icon />}
            value={place}
            onChangeText={(e) => setplace(e)}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Enter Longtitue"
            right={<TextInput.Icon />}
            value={long}
            onChangeText={(e) => setlong(e)}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Enter Latitude"
            right={<TextInput.Icon />}
            value={lat}
            onChangeText={(e) => setlat(e)}
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
          <Button onPress={() => checking()} title="Edit" color={"black"} />
        </View>
      </View>
    </>
  );
};

export default Viewdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
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
  dropdownGender: {
    marginTop: 45,
    marginHorizontal: 10,
    width: "100%",
    marginBottom: 15,
    backgroundColor: "grey",
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
