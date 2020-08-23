import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRCodeScreen() {
  const [value, setValue] = useState("");
  const [showCode, setShowCode] = useState(false);

  function createQR() {
    setShowCode(true);
  }

  function reset() {
    setShowCode(false);
    setValue("")
  }

  console.log(value, showCode)
  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "flex-end" }}
    >
      <View style={{ ...StyleSheet.absoluteFill }}>
        <ImageBackground
          source={require("../assets/Rainbow-Pattern.jpg")}
          style={styles.droidSafeArea}
        >
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>QR Code Page</Text>
          <TextInput
            placeholder="qr code value"
            style={styles.textInput}
            placeholderTextColor="black"
            onChange={(e) => {setValue(e.target.value)}}
          />
          <TouchableOpacity
            onPress={createQR}
            style={{ ...styles.button, backgroundColor: "blue" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
              Submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={reset}
            style={{ ...styles.button, backgroundColor: "blue" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
              Reset
            </Text>
          </TouchableOpacity>
          {showCode && <QRCode value={value} size={250}/>}
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    height: null,
    width: null,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  textInput: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "black",
  },
});
