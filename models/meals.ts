// import {Realm, createRealmContext} from '@realm/react';

// export class Workout extends Realm.Object {
//   _id!: Realm.BSON.ObjectId;
//   name: string;
//   type: string;
//   muscle: string;
//   difficulty: string;
//   createdAt!: Date;

//   // the Task.generate() method creates Task objects with fields with default values
//   static generate(
//     name: string,
//     type: string,
//     muscle: string,
//     difficulty: string
//   ) {
//     return {
//       _id: new Realm.BSON.ObjectId(),
//       name,
//       type,
//       muscle,
//       difficulty,
//       createdAt: new Date(),
//     };
//   }

//   // To use a class as a Realm object type, define the object schema on the static property "schema".
//   static schema = {
//     name: 'Workout',
//     primaryKey: '_id',
//     properties: {
//       _id: 'objectId',
//       name: 'string',
//       type: 'string',
//       muscle: 'string',
//       difficulty: 'string',
//       createdAt: 'date',
//     },
//   };
// }
