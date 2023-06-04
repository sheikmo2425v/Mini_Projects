import { View, StyleSheet, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import axios from "axios";
function HomeScreen({ navigation }) {
  const isfocused = useIsFocused();
  const [data, setdata] = useState([]);
  const [val, setval] = useState(0);
  useEffect(() => {
    if (isfocused) {
      axios.post("http://192.168.55.12:5000/getdata").then((res) => {
        setdata(res.data);
      });
    }
  }, [val, isfocused]);
  const next = () => {
    navigation.navigate("add");
  };
  const deletedata = (i) => {
    console.log(i);
    const value = { id: i };
    axios.post("http://192.168.55.12:5000/delete", value).then((res) => {
      setval(val + 1);
    });
  };

  const viewdata = (d) => {
    navigation.navigate("viewdata", { data: d });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#393646" }}>
      <View style={sytles.add}>
        <Ionicons name="add-circle" size={54} color="#F4EEE0" onPress={next} />
      </View>
      <View style={sytles.va}>
        {data.map((d) => {
          return (
            <Pressable
              onPress={() => viewdata(d)}
              style={sytles.data}
              key={d[0]}
            >
              <View>
                <Text style={{ color: "#F4EEE0" }}>{d[1]}:</Text>
                <Text style={{ color: "#F4EEE0" }}>
                  Longtitude {d[2]} Latitude {d[3]}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#F4EEE0",
                  }}
                >
                  {d[4]}
                </Text>
                <AntDesign
                  name="delete"
                  size={35}
                  color="#F4EEE0"
                  style={sytles.delete}
                  onPress={() => deletedata(d[0])}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
export default HomeScreen;
const sytles = StyleSheet.create({
  delete: {
    marginLeft: "87%",
    marginTop: "-16%",
  },
  add: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  va: {
    margin: 2,
    width: 400,
  },
  data: {
    width: "80%",
    height: 75,
    borderColor: "#F4EEE0",
    borderWidth: 2,
    backgroundColor: "#6D5D6E",
  },
});
