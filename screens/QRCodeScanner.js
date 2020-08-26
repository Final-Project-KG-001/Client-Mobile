import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_APPOINTMENTS, IS_LOGIN } from "../config/apolloClient";

const ADD_DENTAL = gql`
  mutation AddDental($appointmentId: ID, $access_token:String) {
    addDental(appointmentId: $appointmentId, access_token: $access_token) {
      status
      message
    }
  }
`;

const ADD_GENERAL = gql`
  mutation AddGeneral($appointmentId: ID, $access_token:String) {
    addGeneral(appointmentId: $appointmentId, access_token: $access_token) {
      status
      message
    }
  }
`;

export default function QRCodeScanner() {
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { loading, error, data } = useQuery(GET_APPOINTMENTS, {
    variables: { access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDQ1OGIwMGRmZmMwMTAzNGM1NzVjMiIsImVtYWlsIjoidXNlcjFAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTU5ODM1NDM4OH0.JFp1Q2TrZon4-myDvxjA4jxsmpKqihTVyhq8iYWQsNw" },
  });


  const [appointments, setAppointment] = useState([]);

  const [addDental, resultDental] = useMutation(ADD_DENTAL);
  const [addGeneral, resultGeneral] = useMutation(ADD_GENERAL);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if(!loading && data) {
      setAppointment(data.appointments);
    }
  }, [loading, data]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    //Handle buat post ke dental/general
    appointments.map((appointment) => {
      if(data === appointment.userId && appointment.status === 'waiting') {
        if(appointment.doctor[0].polyclinic === 'umum') {
          addGeneral({
            variables: {
              access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDQ1ZGMzMTIxZjkwZjAxYWNjNDdlZSIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTgzODY0OTZ9.1ruuq_cTkdpiy5Wf_r430AQYgWK5UsC3HnBtpMwYzQ4",
              appointmentId: appointment._id
            }
          });
        } else if(appointment.doctor[0].polyclinic === 'gigi') {
          addDental({
            variables: {
              access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDQ1ZGMzMTIxZjkwZjAxYWNjNDdlZSIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTgzODY0OTZ9.1ruuq_cTkdpiy5Wf_r430AQYgWK5UsC3HnBtpMwYzQ4",
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
