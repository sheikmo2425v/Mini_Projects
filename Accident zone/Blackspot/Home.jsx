import { Text, StyleSheet, View, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { useIsFocused } from "@react-navigation/core";

const Home = ({ navigation }) => {
  const [username, setusername] = useState("");
  const isfocused = useIsFocused();
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [value, setvalue] = useState(0);
  const [repassword, setrepassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  useEffect(() => {
    if (isfocused) {
      setusername("");
      setpassword("");
    }
    axios.post("http://192.168.55.12:5000/checklogin", value).then((res) => {
      if (res.data[1] !== "0") {
        if (res.data[3] === "admin") {
          navigation.navigate("after", { name: res.data[1] });
        } else if (res.data[3] === "user") {
          navigation.navigate("user", { name: res.data[1] });
        }
      }
    });
  }, [isfocused]);
  const checking = () => {
    if (username !== "" && password !== "") {
      const value = { user: username, password: password };
      axios.post("http://192.168.55.12:5000", value).then((res) => {
        console.log(res.data);
        if (res.data === "failed") {
          Alert.alert("Failed", "Wrong username and password");
        } else {
          Alert.alert("Success", "Logged Successfully");
          if (res.data[3] === "admin") {
            navigation.navigate("after", { name: res.data[1] });
          } else if (res.data[3] === "user") {
            navigation.navigate("user", { name: res.data[1] });
          }
        }
      });
    } else {
      Alert.alert("Error", "Fill all field");
    }
  };
  const register = () => {
    if (
      username !== "" &&
      password !== "" &&
      repassword !== "" &&
      phone !== ""
    ) {
      if (password === repassword) {
        if (phone.length === 10) {
          const value = { user: username, password: password, phone: phone };
          axios
            .post("http://192.168.55.12:5000/register", value)
            .then((res) => {
              setusername("");
              setpassword("");
              setphone("");
              setrepassword("");
              setvalue(0);
              Alert.alert("success", res.data);
            });
        } else {
          Alert.alert("Error", "Phone dont matched length");
        }
      } else {
        Alert.alert("Error", "Password not matched");
      }
    } else {
      Alert.alert("Error", "Fill all field");
    }
  };
  const check = () => {
    if (value === 0) {
      return (
        <View style={styles.login}>
          <Text style={styles.text}>Welcome Back!</Text>
          <View style={styles.input}>
            <TextInput
              label="Username"
              value={username}
              onChangeText={(e) => setusername(e)}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              label="Password"
              secureTextEntry={passwordVisible}
              right={
                <TextInput.Icon
                  name={passwordVisible ? "eye" : "eye-off"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              value={password}
              onChangeText={(e) => setpassword(e)}
            />
          </View>
          <View style={styles.logbut}>
            <Button
              onPress={() => checking()}
              title="Sign In"
              color={"black"}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "8%",
              fontSize: 18,
            }}
          >
            <Button
              onPress={() => setvalue(1)}
              title="Dont have a account Sign up!"
              color={"pink"}
            />
          </View>
        </View>
      );
    } else if (value === 1) {
      return (
        <View style={styles.register}>
          <Text style={styles.text}>Create Your Account</Text>
          <View style={styles.input}>
            <TextInput
              label="Username"
              right={<TextInput.Icon />}
              value={username}
              onChangeText={(e) => setusername(e)}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              label="Password"
              secureTextEntry={passwordVisible}
              right={
                <TextInput.Icon
                  name={passwordVisible ? "eye" : "eye-off"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              value={password}
              onChangeText={(e) => setpassword(e)}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              label="Retype password"
              secureTextEntry={passwordVisible}
              right={
                <TextInput.Icon
                  name={passwordVisible ? "eye" : "eye-off"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              value={repassword}
              onChangeText={(e) => setrepassword(e)}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              label="Phone no"
              right={<TextInput.Icon />}
              value={phone}
              onChangeText={(e) => setphone(e)}
            />
          </View>
          <View style={styles.regbut}>
            <Button
              onPress={() => register()}
              title="Create Account"
              color={"black"}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "8%",
              fontSize: 18,
            }}
          >
            <Button
              onPress={() => setvalue(0)}
              title="Already have an Account ?"
              color={"pink"}
            />
          </View>
        </View>
      );
    }
  };
  return <>{check()}</>;
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#393646",
    alignItems: "center",
    justifyContent: "center",
  },
  but: {
    marginTop: "2%",
  },
  text: {
    marginTop: "30%",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 25,
    color: "#F4EEE0",
  },
  login: {
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
  log: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#393646",
    marginLeft: "2%",
    marginRight: "2%",
    height: "6%",
    marginTop: "8%",
  },
  logbut: {
    marginTop: "8%",
    justifyContent: "center",
    alignItems: "center",
  },
  register: {
    flex: 1,
    backgroundColor: "#393646",
  },
  regbut: {
    marginTop: "8%",
    justifyContent: "center",
    alignItems: "center",
  },
});
