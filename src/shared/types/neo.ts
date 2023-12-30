export type NearEarthObjectRaw = {
  links: Link;
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: EstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
  is_sentry_object: boolean;
};

export type NearEarthObject = {
  id: string;
  name: string;
  isPotentiallyHazardousAsteroid: boolean;
  absoluteMagnitudeH: number;
  estimatedDiameterMinMeters: number;
  estimatedDiameterMaxMeters: number;
};

export type CloseApproachData = {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: RelativeVelocity;
  miss_distance: MissDistance;
  orbiting_body: string;
};

export type RelativeVelocity = {
  kilometers_per_second: string;
  kilometers_per_hour: string;
  miles_per_hour: string;
};

export type MissDistance = {
  astronomical: string;
  lunar: string;
  kilometers: string;
  miles: string;
};

export type EstimatedDiameter = {
  kilometers: DiameterRange;
  meters: DiameterRange;
  miles: DiameterRange;
  feet: DiameterRange;
};

export type DiameterRange = {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
};

export type Link = {
  self: string;
  next?: string;
  prev?: string;
};

export type NeoObjectReponseData = {
  links: Link;
  element_count: number;
  near_earth_objects: {
    [key: string]: NearEarthObjectRaw[];
  };
};
