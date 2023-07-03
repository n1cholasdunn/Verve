import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Layout from '../components/Layout';
import BarcodeScan from '../components/BarcodeScan';
import {fetchBarcodeInfo} from '../utils/recipeApi';

const Scan = () => {
  // const [scannedBarcode, setScannedBarcode] = useState(null);

  // const handleBarcodeScanned = data => {
  //   setScannedBarcode(data);
  // };

  // const fetchedBarcodeInfo = fetchBarcodeInfo(scannedBarcode);
  return (
    <Layout>
      <BarcodeScan />
      {/* {scannedBarcode && (
        <View>
          <Text>Scanned Barcode: {scannedBarcode}</Text>
        </View>
      )} */}
    </Layout>
  );
};

export default Scan;
