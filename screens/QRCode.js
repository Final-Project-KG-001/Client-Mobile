import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRCodeScreen() {
  const [showCode, setShowCode] = useState(false);

  function showQR() {
    setShowCode(true);
  }

  function hideQR() {
    setShowCode(false);
  }

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
          <TouchableOpacity
            onPress={showQR}
            style={{ ...styles.button, backgroundColor: "blue" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
              Show
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={hideQR}
            style={{ ...styles.button, backgroundColor: "blue" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
              Hide
            </Text>
          </TouchableOpacity>
          {showCode && <QRCode value="{UserId: 10}" size={250}/>}
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
