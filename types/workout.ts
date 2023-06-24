import {Reoccurence} from './reoccurence';

export type Workout = {
  id: string;
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  //TODO figure out adding in reoccurence if it is string or other
  // reoccurence: Reoccurence;
  date: Date;
};
