import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {AuthContext} from '../../context/auth';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../../firebaseConfig';

const WeightChart = () => {
  let thisMonth = new Date().toLocaleString().slice(5, 7);
  const [dateData, setDateData] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const userContext = useContext(AuthContext);

  useEffect(() => {
    const weightQuery = collection(db, 'weighIn-test');

    onSnapshot(weightQuery, snapshot => {
      let weightList = [];
      snapshot.docs.map(doc => weightList.push({...doc.data(), id: doc.id}));
      weightList = weightList.filter(weight => {
        return (
          weight.date.slice(5, 7) === thisMonth &&
          weight.userId === userContext.UserUID
        );
      });

      const dateMap = {};

      weightList.map(el => {
        return (dateMap[el.date] = el.weight);
      });

      const dateList = Object.keys(dateMap).map(el => el.slice(8, 10));
      const weightsList = Object.values(dateMap).map(el => el);

      setDateData(dateList);
      setWeightData(weightsList);
    });
  }, []);

  const screenWidth = Dimensions.get('window').width;
  return (
    <LineChart
      data={{
        //TODO start @ months since first log of weight
        //TODO if months tracked > 12 show jan-dec and cap at that.
        labels: dateData,
        datasets: [
          {
            data: weightData,
            strokeWidth: 2,
          },
        ],
      }}
      width={screenWidth - 16}
      height={220}
      yAxisSuffix=" lbs"
      chartConfig={{
        backgroundGradientFrom: '#09090b',
        backgroundGradientTo: '#09090b',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      style={{marginVertical: 8, borderRadius: 16}}
    />
  );
};

export default WeightChart;
