import { Hours } from "./Hours";

export interface Restaurant {
  address1: string;
  attire: string;
  city: string;
  genre: string[];
  hours: Hours;
  id: string;
  lat: string;
  long: string;
  name: string;
  state: string;
  tags: string[];
  telephone: string;
  website: string;
  zip: string;
}
