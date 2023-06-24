export type Meal = {
  _id: String;
  name: string;
  ingredientLines: string[];
  calories: number;
  macros: {
    carbs: number;
    fat: number;
    protein: number;
  };
  image: string;
  serving: number;
  createdAt: Date;
};
