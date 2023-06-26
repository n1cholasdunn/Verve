// import {collection, onSnapshot} from '@firebase/firestore';
// import React, {useEffect, useState} from 'react';
// import {View, Text, FlatList} from 'react-native';
// import {db} from '../firebaseConfig';

// const WorkoutRender = () => {
//   const [workouts, setWorkouts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const workoutQuery = collection(db, 'workout-test');
//     onSnapshot(workoutQuery, snapshot => {
//       let workoutList = [];
//       snapshot.docs.map(doc => workoutList.push({...doc.data(), id: doc.id}));
//       setWorkouts(workoutList);
//       setLoading(false);
//     });
//   }, []);

//   const renderWorkouts = ({item}) => (
//     <View style={{marginTop: 20, padding: 15}}>
//       <Text>Name: {item.name}</Text>
//       <Text>Muscle: {item.muscle}</Text>
//       <Text>Reps: {item.reps}</Text>
//       <Text>Sets: {item.sets}</Text>
//       <Text>Weight: {item.weight}lbs</Text>
//       <Text>Date: {item.date.toString()}</Text>
//     </View>
//   );
//   return (
//     <View>
//       <FlatList
//         data={workouts}
//         renderItem={renderWorkouts}
//         horizontal={true}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// export default WorkoutRender;
