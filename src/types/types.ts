export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  date_local: string;
  date_unix: number;
  rocket: string;
  launchpad: string;
  payloads: string[];
  success: boolean | null;
  upcoming: boolean;
  details?: string;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    webcast: string | null;
    article: string | null;
    wikipedia: string | null;
  };
}

export interface Rocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
}

export interface Launchpad {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  details: string;
}

export interface Payload {
  name: string;
  type: string;
  customers: string[];
  mass_kg: number | null;
  orbit: string;
  id: string;
}
