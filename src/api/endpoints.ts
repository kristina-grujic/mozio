import data from './cities.json';

type City = {
  name: string;
  latitude: number;
  longitude: number;
}

const mappedData = data.map((item) => ({
  name: item[0] as string,
  latitude: item[1] as number,
  longitude: item[2] as number
}));

export function fetchCities(keyword: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (keyword.toLowerCase().includes('fail')) {
          throw new Error('Failed handling the request');
        }
        const result = mappedData
          .filter((item: City) => item.name.toLowerCase().includes(keyword.toLowerCase()))
          .map((item) => item.name);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    }, 150);
  });
}