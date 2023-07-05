import {
  EDAMAM_APP_ID,
  EDAMAM_APP_KEY,
  EDAMAM_NUTRIENT_APP_ID,
  EDAMAM_NUTRIENT_APP_KEY,
} from '@env';

export const fetchRandomRecipes = async (mealtype, dietType) => {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?app_id=${EDAMAM_APP_ID}&mealType=${mealtype}&diet=${dietType}&type=public&random=true&app_key=${EDAMAM_APP_KEY}`
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

export const fetchIngredientInfo = async ingredient => {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-data?app_id=${EDAMAM_NUTRIENT_APP_ID}&app_key=${EDAMAM_NUTRIENT_APP_KEY}&ingr=${ingredient}`
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

export const fetchBarcodeInfo = async upcBarcode => {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_NUTRIENT_APP_ID}&app_key=${EDAMAM_NUTRIENT_APP_KEY}&upc=${upcBarcode}`
    );
    const jsonResponse = await response.json();
    console.log('json response', jsonResponse);
    if (response.ok) {
      jsonResponse.ok = true;
      return jsonResponse;
    }
    throw new Error('barcode error');
  } catch (error) {
    console.log('barcode error', error);
  }
};
