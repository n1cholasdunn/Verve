import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Layout from '../components/Layout';
import BarcodeScan from '../components/BarcodeScan';
import {fetchBarcodeInfo} from '../utils/recipeApi';
import RenderScans from '../components/RenderScans';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../firebaseConfig';
import {AuthContext} from '../context/auth';
import ScanData from '../components/ScanData';

const Scan = () => {
  const [isScanned, setIsScanned] = useState(false);
  // const [scans, setScans] = useState<Scan[]>([]);
  // const [scannedFood, setScannedFood] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const handleBarcodeScanned = data => {
  //   setScannedBarcode(data);
  // };
  // const fetchedBarcodeInfo = () => {
  //   setScannedFood([...scannedFood, scannedBarcode]);
  //   return fetchBarcodeInfo(scannedBarcode);
  // };
  // const userContext = useContext(AuthContext);

  // useEffect(() => {
  //   setLoading(true);
  //   const scanQuery = collection(db, 'scan-test');

  //   onSnapshot(scanQuery, snapshot => {
  //     let scanList = [];
  //     snapshot.docs.map(doc => scanList.push({...doc.data(), id: doc.id}));
  //     scanList = scanList.filter(scan => {
  //       scan.userId === userContext.UserUID;
  //     });
  //     setScans(scanList);
  //     setLoading(false);
  //   });
  // }, []);

  return (
    <Layout>
      {isScanned ? <ScanData /> : <BarcodeScan setIsScanned={setIsScanned} />}
    </Layout>
  );
};

export default Scan;

//  {
//    scannedBarcode && (
//      <View>
//        <Text>Scanned Barcode: {scannedBarcode}</Text>
//      </View>
//    );
//  }
/* <View className="mt-10">
        <Text className="text-3xl  pl-2 text-[#606368]">Scanned Items</Text>
        {scanned && (
          <FlatList
            data={allScans}
            renderItem={RenderScans}
            horizontal={true}
            keyExtractor={item => item.foodId}
          />
        )}
      </View> */
