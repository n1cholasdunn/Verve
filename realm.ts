import {Realm, createRealmContext} from '@realm/react';
import {Workout} from './models/workout';
import {Meal} from './models/meals';

const config = {
  // schema: [Workout, Meal],
  schema: [Workout],
};
export default createRealmContext(config);
