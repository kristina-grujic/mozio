import data from './cities.json';

type City = {
  name: string;
  latitude: number;
  longitude: number;
}

type Distance = {
  from: string;
  to: string;
  distance: number;
}

const mappedData = data.map((item) => ({
  name: item[0] as string,
  latitude: item[1] as number,
  longitude: item[2] as number
}));

function haversine(cityA: City, cityB: City): number {
  const R = 6371e3; // metres
  const φ1 = cityA.latitude * Math.PI/180; // φ, λ in radians
  const φ2 = cityB.latitude * Math.PI/180;
  const Δφ = (cityB.latitude - cityA.latitude) * Math.PI/180;
  const Δλ = (cityB.longitude - cityA.longitude) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const meters = R * c; // in metres
  return Math.round(meters/10) / 100;
}

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
    }, 250);
  });
}

export function fetchDistances(cities: string[]): Promise<Distance[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (cities.find((item) => item.toLowerCase().includes('dijon'))) {
          throw new Error('Failed handling the request');
        }
        const distances = [];
        let mappedCities = cities.map((item) => mappedData.find((city) => city.name === item)!);
        for (let i = 0; i < mappedCities.length -1; i++) {
          distances.push({
            from: cities[i],
            to: cities[i + 1],
            distance: haversine(mappedCities[i], mappedCities[i + 1])
          });
        }
        resolve(distances);
      } catch (e) {
        reject(e);
      }
    }, 500);
  });
}