import type { NearEarthObject, NearEarthObjectRaw } from '../types';

export const mapNeoObjects = (raw: NearEarthObjectRaw[]): NearEarthObject[] => {
  return raw.map((neo) => ({
    id: neo.id,
    name: neo.name,
    absoluteMagnitudeH: neo.absolute_magnitude_h,
    isPotentiallyHazardousAsteroid: neo.is_potentially_hazardous_asteroid,
    estimatedDiameterMinMeters: Number(
      neo.estimated_diameter.meters.estimated_diameter_min.toFixed(2),
    ),
    estimatedDiameterMaxMeters: Number(
      neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2),
    ),
  }));
};
