import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function QRCodeScanner() {
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    //Handle buat post ke dental/general
  };

  if (permission === false) {
    return <Text>No access to camera!</Text>;
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}>
        QR Code Scanner
      </Text>
      <View style={{ flex: 0.9, margin: 0 }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} style={{ marginHorizontal: 20}}/>
      )}
      {!scanned && <Text style={{textAlign: "center", fontSize: 20}}>Scanning...</Text>}
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
  }
});
