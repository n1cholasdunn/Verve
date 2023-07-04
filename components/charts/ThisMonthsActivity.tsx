import {Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ContributionGraph} from 'react-native-chart-kit';
import {AuthContext} from '../../context/auth';
import {collection, onSnapshot} from '@firebase/firestore';
import {db} from '../../firebaseConfig';
import {RectProps} from 'react-native-svg';
import WorkoutData from '../WorkoutData';

const ThisMonthsActivity = () => {
  const [loading, setLoading] = useState(false);
  const userContext = useContext(AuthContext);
  const [activity, setActivity] = useState([]);

  let d = new Date();
  let thisMonth = new Date().toLocaleString().slice(5, 7);
  let nextMonth = new Date(d.setMonth(d.getMonth() + 1, 1));
  useEffect(() => {
    setLoading(true);
    const workoutQuery = collection(db, 'workout-test');

    onSnapshot(workoutQuery, snapshot => {
      let thisMonthsWorkout = [];
      snapshot.docs.map(doc =>
        thisMonthsWorkout.push({...doc.data(), id: doc.id})
      );
      thisMonthsWorkout = thisMonthsWorkout.filter(workout => {
        return (
          workout.date.slice(5, 7) === thisMonth &&
          workout.userId === userContext.UserUID
        );
      });

      setActivity(thisMonthsWorkout);
      setLoading(false);
    });
  }, []);

  const activityData = [];

  activity.map(workout => {
    activityData.push({date: workout.date, count: 5});
  });
  console.log(activityData);
  return (
    <View>
      <ContributionGraph
        tooltipDataAttrs={(val: unknown) => val}
        values={activityData}
        endDate={new Date(nextMonth)}
        width={500}
        height={200}
        numDays={40}
        chartConfig={{
          backgroundGradientFrom: '#1E1E1E',
          backgroundGradientTo: '#1E1E1E',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
      {activity.map(e => (
        <Text className="text-[#ffffff]">{e.date}</Text>
      ))}
      <Text className="text-[#ffffff]">hell0</Text>
    </View>
  );
};

export default ThisMonthsActivity;
