import { createHttpClient } from '~/services/http-client.factory';
import { type protos } from '@googlemaps/places';

export function createGoogleHttpClient({ apiKey }: CreateGoogleHttpClientOptions) {
  return createHttpClient('https://places.googleapis.com/v1/')<GooglePlacesApiRoutes>({
    headers: {
      'X-Goog-Api-Key': apiKey,
    },
  });
}

export type GooglePlacesApiRoutes = {
  post: {
    ['https://places.googleapis.com/v1/places:autocomplete']: protos.google.maps.places.v1.AutocompletePlacesResponse;
    ['https://places.googleapis.com/v1/places:searchText']: protos.google.maps.places.v1.SearchTextResponse;
    ['https://places.googleapis.com/v1/places:searchNearby']: protos.google.maps.places.v1.SearchNearbyResponse;
    [
      details: `https://places.googleapis.com/v1/places/${string}`
    ]: protos.google.maps.places.v1.IPlace;
    [
      photo: `https://places.googleapis.com/v1/${string}/media`
    ]: protos.google.maps.places.v1.IPlace;
  };
};

export type CreateGoogleHttpClientOptions = {
  apiKey: string;
};
