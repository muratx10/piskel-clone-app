/* eslint-disable no-console */
/* eslint-disable arrow-parens */

const key = '3ec6babd8ab7bb3d860246e52e49cd3a9578091420e232f79e8a55af74b846d6';

const getCity = async (city) => {
  const trimmed = city.trim();
  const baseURL = 'https://api.unsplash.com/photos/random';
  const query = `?query=town, ${trimmed}&client_id=${key}`;

  // fetching
  try {
    const response = await fetch(baseURL + query);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { getCity };
