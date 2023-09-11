import {FITNESS_CALCULATOR_HOST, FITNESS_CALCULATOR_KEY} from '@env';

export const fetchFitnessInfo = async (
  age: string,
  gender: string,
  weight: string,
  height: string,
  activitylevel: string,
  goal: string
) => {
  try {
    const response = await fetch(
      `https://fitness-calculator.p.rapidapi.com/macrocalculator?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${activitylevel}&goal=${goal}`,
      {
        headers: {
          'X-RapidAPI-Host': FITNESS_CALCULATOR_HOST,
          'X-RapidAPI-Key': FITNESS_CALCULATOR_KEY,
        },
      }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (response.ok) {
      jsonResponse.ok = true;

      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};
