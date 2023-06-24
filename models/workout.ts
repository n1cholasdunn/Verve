import {Realm, createRealmContext} from '@realm/react';
import {Recurrence} from '../types/recurrence';
//TODO figure out reoccurence type etc and uncomment all of the occurences of it in file
export class Workout extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  // recurrence: string;
  createdAt!: Date;

  // the Task.generate() method creates Task objects with fields with default values
  static generate(
    name: string,
    type: string,
    muscle: string,
    equipment: string,
    difficulty: string,
    instructions: string
    // recurrence: Recurrence
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name,
      type,
      muscle,
      equipment,
      difficulty,
      instructions,
      // recurrence: recurrence.toString(),
      createdAt: new Date(),
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Workout',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      type: 'string',
      muscle: 'string',
      equipment: 'string',
      difficulty: 'string',
      instructions: 'string',
      // recurrence: 'string',
      createdAt: 'date',
    },
  };
}
