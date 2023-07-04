import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {collection, deleteDoc, doc, onSnapshot} from '@firebase/firestore';
import {AntDesign} from '@expo/vector-icons';
import {db} from '../firebaseConfig';
import {fetchBarcodeInfo} from '../utils/recipeApi';
import {scanType} from '../types/scan';
import {AuthContext} from '../context/auth';

const RenderScans = ({item}) => {
  const [barcodeInfo, setBarcodeInfo] = useState(null);
  // const [scans, setScans] = useState<Scan[]>([]);
  const [allScans, setAllScans] = useState<scanType[]>([]);
  const [loading, setLoading] = useState(false);
  const userContext = useContext(AuthContext);

  const handleDelete = async scan => {
    try {
      await deleteDoc(doc(db, 'scan-test', scan));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="p-5 mb-10 mx-3 h-180 w-300 bg-[#1E1E1E] border rounded-md flex-row">
      <View>
        <Text className="text-2xl text-[#BB86FC]">{barcodeInfo.label}</Text>

        <Text className="text-lg text-[#606368]">
          Calories: {barcodeInfo.nutrients.ENERC_KCAL}
        </Text>
        <Text className="text-lg text-[#606368]">
          Fat: {barcodeInfo.nutrients.FAT}g
        </Text>
        <Text className="text-lg text-[#606368]">
          Sugar: {barcodeInfo.nutrients.SUGAR}g
        </Text>
        <Text className="text-lg text-[#606368]">
          Protein: {barcodeInfo.nutrients.PROCNT}g
        </Text>
        <Text className="text-lg text-[#606368]">Date: {barcodeInfo.date}</Text>
      </View>
      <View className="ml-[135px]">
        <Pressable onPress={() => handleDelete(barcodeInfo.foodId)}>
          <AntDesign name="delete" size={24} color="#606368" />
        </Pressable>
      </View>
    </View>
  );
};

export default RenderScans;
// useEffect(() => {
//   const data = fetchBarcodeInfo(upcCode);
//   setBarcodeInfo(data);
//   setAllScans([...allScans, data]);
// }, []);

//   function addScan() {
//   const scanDb = collection(db, 'scan-test');
//   addDoc(scanDb, {
//     foodId:
//     label:
//     nutrients: {
//       ENERC_KCAL:
//       FAT:
//       SUGAR:
//       PROCNT:
//     }
//     date: today,
//   });
// }

// useEffect(() => {
//   setLoading(true);
//   const scanQuery = collection(db, 'scan-test');

//   onSnapshot(scanQuery, snapshot => {
//     let scanList = [];
//     snapshot.docs.map(doc => scanList.push({...doc.data(), id: doc.id}));
//     scanList = scanList.filter(scan => {
//       scan.userId === userContext.UserUID;
//     });
//     setAllScans(scanList);
//     setLoading(false);
//   });
// }, []);
