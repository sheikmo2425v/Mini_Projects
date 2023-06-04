import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import Home from "./Blackspot/Home";
import Afterlogin from "./Blackspot/Afterlogin";

const Stack = createNativeStackNavigator();
import { MaterialIcons } from "@expo/vector-icons";
import Adddata from "./Blackspot/Adddata";
import Viewdata from "./Blackspot/Viewdata";
import axios from "axios";
import PickLocation from "./Blackspot/Picklocation";
import Pick_Location from "./Blackspot/Picklocation";

export default function Main() {
  const logout = (navigation) => {
    console.log("djsk");
    navigation.navigate("home");
    axios.post("http://192.168.55.12:5000/logout").then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              title: "Login",
              headerStyle: {
                backgroundColor: "#6D5D6E", // Change the background color of the header
              },
            }}
          />
          <Stack.Screen
            name="after"
            component={Afterlogin}
            options={({ navigation }) => ({
              title: "Home",
              headerLeft: null, // Remove the back arrow icon

              headerRight: ({ tintColor }) => (
                <MaterialIcons
                  name="logout"
                  size={24}
                  color="blue"
                  onPress={() => logout(navigation)}
                />
              ),
            })}
          />

          <Stack.Screen
            name="add"
            component={Adddata}
            options={({ navigation }) => ({
              title: "Addplace",
              headerRight: ({ tintColor }) => (
                <MaterialIcons
                  name="logout"
                  size={24}
                  color="blue"
                  onPress={() => logout(navigation)}
                />
              ),
            })}
          />
          <Stack.Screen
            name="viewdata"
            component={Viewdata}
            options={({ navigation }) => ({
              title: "Editplace",
              headerRight: ({ tintColor }) => (
                <MaterialIcons
                  name="logout"
                  size={24}
                  color="blue"
                  onPress={() => logout(navigation)}
                />
              ),
            })}
          />
          <Stack.Screen name="PickLocation" component={Pick_Location} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
