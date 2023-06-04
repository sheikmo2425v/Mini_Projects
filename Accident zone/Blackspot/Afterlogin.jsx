import { useRoute } from "@react-navigation/core";
import { useLayoutEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./Homescreen";
import MapScreen from "./MapScreen";
const Tab = createMaterialBottomTabNavigator();
const Afterlogin = ({ navigation }) => {
  const route = useRoute();
  console.log(route);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
  }, [route]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Homescreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Mapscreen"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Afterlogin;
