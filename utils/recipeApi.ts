import {EDAMAM_APP_ID, EDAMAM_APP_KEY} from '@env';

export const fetchRandomRecipes = async () => {
  try {
    const response = await fetch(
      'https://api.edamam.com/api/recipes/v2?app_id=0770ea4b&mealType=breakfast&type=public&app_key=3396e9605c799f10c91d3f8fff39dcf3'
      //   `https://api.edamam.com/api/recipes/v2?app_id=${EDAMAM_APP_ID}&mealType=${mealtype}&type=public&app_key=${EDAMAM_APP_KEY}`
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
