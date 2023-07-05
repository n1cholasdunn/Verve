import {collection, onSnapshot} from '@firebase/firestore';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, FlatList} from 'react-native';
import {AuthContext} from '../context/auth';
import RenderScans from './RenderScans';
import {scanType} from '../types/scan';
import {db} from '../firebaseConfig';

const ScanData = () => {
  const [allScans, setAllScans] = useState<scanType[]>([]);
  const [loading, setLoading] = useState(false);
  const userContext = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    const scanQuery = collection(db, 'scan-test');

    onSnapshot(scanQuery, snapshot => {
      let scanList = [];
      snapshot.docs.map(doc => scanList.push({...doc.data(), id: doc.id}));
      scanList = scanList.filter(scan => {
        scan.userId === userContext.UserUID;
      });
      setAllScans(scanList);
      setLoading(false);
    });
  }, []);

  return (
    <SafeAreaView>
      <Text>HI IT WORKS</Text>
      {/* <ScrollView>
        <View>
          {loading! && (
            <FlatList
              data={allScans}
              renderItem={RenderScans}
              keyExtractor={item => item.foodId}
            />
          )}
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default ScanData;
