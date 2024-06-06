import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const { width, height } = Dimensions.get('window');

const mapContainerStyle = {
  width: '95%',
  height: '50%',
};

const center = {
  lat: -22.9141396, // Centro inicial do mapa
  lng: -47.0681575,
};

const sensor1 = {
  lat: -22.9141396, // Coordenadas fixas (latitude)
  lng: -47.0681575, // Coordenadas fixas (longitude)
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      }, (newLocation) => {
        setLocation(newLocation.coords);
      });
    })();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <LoadScript googleMapsApiKey="AIzaSyBUOZb-tvDC79YPwGIssvDAbKqyR6VoGqA">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={sensor1} // Centralizar no local fixo
            zoom={20} // Definir nível de zoom
            options={{
              zoomControl: false, // Desativar controle de zoom
              streetViewControl: false, // Desativar controle de visualização de rua
              mapTypeControl: false, // Desativar controle de tipo de mapa
              fullscreenControl: false, // Desativar controle de tela cheia
              draggable: false, // Impedir arrastar o mapa
              scrollwheel: false, // Desativar rolagem para zoom
              disableDoubleClickZoom: true, // Desativar zoom com duplo clique
              disableDefaultUI: true, // Desativar toda a interface de usuário padrão
            }}
          >
          <Marker
            position={sensor1} // Adicionar marcador fixo
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }}
          />
          {location && (
            <Marker
              position={{ lat: location.latitude, lng: location.longitude }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: width - 40,
    height: height / 2,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: {
    marginTop: 20,
    fontSize:40,
  },
});
