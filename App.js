import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
//import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { Camera, CameraType } from "expo-camera";
export default function App() {

  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {

    //Camara
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    //Localizacion
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }

  }, []);
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app! hola</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else if (!hasPermission) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  } else if (hasPermission) {
    return (
      <WebView
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
        source={{ uri: 'https://react-b1mwzt.stackblitz.io' }}
        style={{ marginTop: 20 }}
        originWhitelist={['*']}
        allowsInlineMediaPlayback
        javaScriptEnabled
        scalesPageToFit
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState
        javaScriptEnabledAndroid
        useWebkit
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
