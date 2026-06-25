export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface APIResponse<T> {
  items: T[];
  meta: Meta;
  links: Links;
}

export interface Planet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  deletedAt: string | null;
}

export interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
  deletedAt: string | null;
}

export interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: string | null;
}

export interface CharacterDetail extends Character {
  originPlanet: Planet;
  transformations: Transformation[];
}

export interface CharacterPayload {
  limit: number;
  gender?: string;
  race?: string;
}
