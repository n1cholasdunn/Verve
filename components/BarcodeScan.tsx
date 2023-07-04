import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {fetchBarcodeInfo} from '../utils/recipeApi';
import RenderScans from './RenderScans';
import {addDoc, collection} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import {AuthContext} from '../context/auth';

const BarcodeScan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [upcScanData, setUpcScanData] = useState('Nothing scanned yet');
  const [apiData, setApiData] = useState(null);
  const [allScans, setAllScans] = useState([]);
  const userContext = useContext(AuthContext);

  let today = new Date().toLocaleString().slice(0, 10);

  const askCameraPermission = () => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted');
    })();
  };

  useEffect(() => {
    askCameraPermission();
  }, []);

  const addScan = apiData => {
    const scanDb = collection(db, 'scan-test');
    addDoc(scanDb, {
      foodId: apiData.hints[0].food.foodId,
      label: apiData.hints[0].food.label,
      nutrients: {
        ENERC_KCAL: Math.floor(apiData.hints[0].food.nutrients.ENERC_KCAL),
        FAT: Math.floor(apiData.hints[0].food.nutrients.FAT),
        CHOCDF: Math.floor(apiData.hints[0].food.nutrients.CHOCDF),
        PROCNT: Math.floor(apiData.hints[0].food.nutrients.PROCNT),
      },
      date: today,
      userId: userContext.UserUID,
    });
  };
  const handleBarcodeScanned = async ({type, data}) => {
    setScanned(true);
    setUpcScanData(data);
    const barcodeData = await fetchBarcodeInfo(data);
    console.log(barcodeData);
    setApiData(barcodeData);
    addScan(barcodeData);
    // setAllScans([...allScans, apiData]);
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
      <Text>{upcScanData}</Text>
      {scanned && (
        <Button
          title="Scan Again?"
          onPress={() => setScanned(false)}
          color={'#01DBC6'}
        />
      )}
    </View>
  );
};

export default BarcodeScan;

// useEffect(() => {
//   const data = fetchBarcodeInfo(upcScanData);
//   setApiData(data);
//   setAllScans([...allScans, data]);
// }, [upcScanData]);

// useEffect(() => {
//   //adds in most recent scan whenever new one is updated to apiData
//   addScan();
// }, [apiData]);
// setApiData(fetchBarcodeInfo(upcScanData));
// setAllScans([...allScans, apiData]);
