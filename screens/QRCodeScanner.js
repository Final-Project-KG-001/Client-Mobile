import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_APPOINTMENT } from "../config/apolloClient";

const ADD_DENTAL = gql`
  mutation AddDental($appointmentId: ID) {
    addDental(appointmentId: $appointmentId) {
      status
      message
    }
  }
`;

const ADD_GENERAL = gql`
  mutation AddGeneral($appointmentId: ID) {
    addGeneral(appointmentId: $appointmentId) {
      status
      message
    }
  }
`;

export default function QRCodeScanner() {
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { loading, error, data } = useQuery(GET_APPOINTMENT);

  const [appointments, setAppointment] = useState([]);

  const [addDental] = useMutation(ADD_DENTAL);
  const [addGeneral] = useMutation(ADD_GENERAL);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if(!loading && data) {
      setAppointment(data);
    }
  }, [loading, data]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    //Handle buat post ke dental/general
    appointments.appointments.map((appointment) => {
      if(data.UserId === appointment.userId && appointment.status === 'waiting') {
        if(appointment.doctor[0].polyclinic === 'umum') {
          addGeneral({
            variables: {
              appointmentId: appointment._id
            }
          });
        } else if(appointment.doctor[0].polyclinic === 'gigi') {
          addDental({
            variables: {
              appointmentId: appointment._id
            }
          });
        }
      }
    })
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
