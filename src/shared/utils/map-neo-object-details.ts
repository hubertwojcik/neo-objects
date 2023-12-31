import dayjs from 'dayjs';
import type { NeoObjectDetails, NeoObjectDetailsResponse } from '../types';

export const mapNeoObjectDetails = (
  neo: NeoObjectDetailsResponse,
): NeoObjectDetails => {
  const today = dayjs();

  const sortedApproaches = neo.close_approach_data.sort(
    (a, b) =>
      dayjs(a.close_approach_date).unix() - dayjs(b.close_approach_date).unix(),
  );

  const previousApproach = sortedApproaches
    .filter((approach) => dayjs(approach.close_approach_date).isBefore(today))
    .pop();

  const nextApproach = sortedApproaches.find((approach) =>
    dayjs(approach.close_approach_date).isAfter(today),
  );

  return {
    id: neo.id,
    name: neo.name,
    isPotentiallyHazardousAsteroid: neo.is_potentially_hazardous_asteroid,
    absoluteMagnitude: neo.absolute_magnitude_h,
    isSentryObject: neo.is_sentry_object,

    previousApproachDate: previousApproach
      ? previousApproach.close_approach_date_full
      : 'N/A',
    nextApproachDate: nextApproach
      ? nextApproach.close_approach_date_full
      : 'N/A',
    firstObservation: neo.orbital_data.first_observation_date,
    oribitalPeriod: neo.orbital_data.orbital_period,
    orbitingBody: neo.close_approach_data[0]?.orbiting_body || 'Unknown',
    estimatedDiameter: neo.estimated_diameter,
    relativeVelocity: neo.close_approach_data[0]?.relative_velocity,
    missDistance: neo.close_approach_data[0]?.miss_distance,
    orbitClassType: neo.orbital_data.orbit_class.orbit_class_type,
    orbitClassDescription: neo.orbital_data.orbit_class.orbit_class_description,
    orbitClassRange: neo.orbital_data.orbit_class.orbit_class_range,
  };
};
