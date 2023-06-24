import {Realm, createRealmContext} from '@realm/react';

export class Meal extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  user_id: string;
  name!: string;
  ingredientLines: string[];
  calories: number;
  macros: {
    carbs: number;
    fat: number;
    protein: number;
  };
  image: string;
  serving: number;
  createdAt!: Date;

  // the Task.generate() method creates Task objects with fields with default values
  static generate(
    user_id: string,
    name: string,
    ingredientLines: string[],
    calories: number,
    macros: {
      carbs: number;
      fat: number;
      protein: number;
    },
    image: string,
    serving: number
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      user_id,
      name,
      ingredientLines,
      calories,
      macros,
      image,
      serving,
      createdAt: new Date(),
    };
  }

  //   // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Meal',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      ingredientLines: 'string[]',
      calories: 'number',
      macros: {
        carbs: 'number',
        fat: 'number',
        protein: 'number',
      },
      image: 'string',
      serving: 'number',
      createdAt: 'date',
    },
  };
}
