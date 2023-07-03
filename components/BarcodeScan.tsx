import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {fetchBarcodeInfo} from '../utils/recipeApi';

const BarcodeScan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Nothing scanned yet');

  const askCameraPermission = () => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted');
    })();
  };

  useEffect(() => {
    askCameraPermission();
  }, []);

  const handleBarcodeScanned = ({type, data}) => {
    setScanned(true);
    setText(data);
    // onBarcodeScanned(data);
    console.log('Type: ' + type + '\nData: ' + data);
  };

  if (hasPermission === null) {
    return (
      <View className="m-4 text-slate-200 text-4xl font-semibold">
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text className="m-4 text-slate-200 text-4xl font-semibold">
          No access to camera
        </Text>
        <Button title="Allow Camera" onPress={() => askCameraPermission()} />
      </View>
    );
  }

  return (
    <View>
      <View className="items-center justify-center h-[300px] w-80" bg-red-200>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
          className="h-96 w-96"
        />
      </View>
      <Text className="self-center text-slate-200 text-4xl font-bold">
        {text}
      </Text>
      {scanned && (
        <Button
          title="Scan Again?"
          onPress={() => setScanned(false)}
          color={'tomato'}
        />
      )}
    </View>
  );
};

export default BarcodeScan;
