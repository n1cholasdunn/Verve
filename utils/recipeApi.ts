import {EDAMAM_APP_ID, EDAMAM_APP_KEY} from '@env';

export const fetchRandomRecipes = async mealtype => {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?app_id=${EDAMAM_APP_ID}&mealType=${mealtype}&type=public&app_key=${EDAMAM_APP_KEY}`
    );
    const jsonResponse = await response.json();
    if (response.ok) {
      jsonResponse.ok = true;
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};
