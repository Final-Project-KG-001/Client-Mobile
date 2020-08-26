import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
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
  const [ permission, setPermission ] = useState(null);
  const [ scanned, setScanned ] = useState(false);
  const isLogin = useQuery(IS_LOGIN)

  console.log(isLogin.data)

  const { loading, error, data } = useQuery(GET_APPOINTMENTS, {
    variables: { access_token: isLogin.data.isLogin.token },
  });


  const [ appointments, setAppointment ] = useState([]);

  const [ addDental ] = useMutation(ADD_DENTAL);
  const [ addGeneral ] = useMutation(ADD_GENERAL);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      setAppointment(data.appointments);
    }
  }, [ loading, data ]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${ type } and data ${ data } has been scanned!`);
    console.log(`Bar code with type ${ type } and data ${ data } has been scanned!`);
    //Handle buat post ke dental/general
    appointments.map((appointment) => {
      if (data === appointment.userId && appointment.status === 'waiting') {
        if (appointment.doctor[ 0 ].polyclinic === 'umum') {
          addGeneral({
            variables: {
              access_token: isLogin.data.isLogin.token,
              appointmentId: appointment._id
            }
          });
        } else if (appointment.doctor[ 0 ].polyclinic === 'gigi') {
          addDental({
            variables: {
              access_token: isLogin.data.isLogin.token,
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
      style={ { flex: 1, backgroundColor: "black"} }
    >
      <View style={ styles.header }>
          <Text style={ { fontSize: 20, fontWeight: 'bold' } }>QRCode Scanner</Text>
      </View>
      <View style={ { flex: 0.9, margin: 0  } }>
        <BarCodeScanner
          onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned }
          style={ StyleSheet.absoluteFill }
        />
      </View>
      { scanned && (
        <Button title={ "Tap to Scan Again" } onPress={ () => setScanned(false) } style={ { marginHorizontal: 20 } } />
      ) }
      { !scanned && <Text style={ { textAlign: "center", fontSize: 20, color: 'white' } }>Scanning...</Text> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcccc'
  },
  header: {
      backgroundColor: '#e66767',
      height: 80,
      alignItems: 'center',
      paddingTop: 40,
      marginBottom: 10
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    height: null,
    width: null,
    justifyContent: "center",
    alignItems: "center",
  }
});
