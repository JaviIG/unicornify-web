import type { protos } from '@googlemaps/places';
import type { PlaceSuggestion } from '../../models/places.model';
import { createGoogleHttpClient } from './google-places.client';
export function createPlacesService() {
  const config = useRuntimeConfig();
  /* https://github.com/googleapis/google-cloud-node/tree/main/packages/google-maps-places */
  const client = createGoogleHttpClient({ apiKey: config.googleMapsApiKey });

  return {
    async autocompletePlace(options: PlaceAutocompleteRequest) {
      const response = await client.post('places:autocomplete', options);
      return (
        response.suggestions?.filter(isPlacePrediction).map(
          (suggestion): PlaceSuggestion => ({
            name: suggestion.placePrediction.text.text,
            placeId: suggestion.placePrediction.placeId,
          }),
        ) ?? []
      );
    },
    //   async searchText({ query, sessionId }: SearchTextOptions) {
    //     const response = await client.post('places:searchText', {
    //       input: query,
    //       sessionToken: sessionId,
    //     });
    //     return (
    //       response.suggestions?.filter(isPlacePrediction).map(
    //         (suggestion): PlaceSuggestion => ({
    //           name: suggestion.placePrediction.text.text,
    //           placeId: suggestion.placePrediction.placeId,
    //         }),
    //       ) ?? []
    //     );
    //   },
    //   async searchNearby({ query, sessionId }: SearchNearbyOptions) {
    //     const response = await client.post('places:searchNearby', {
    //       input: query,
    //       sessionToken: sessionId,
    //     });
    //     return (
    //       response.suggestions?.filter(isPlacePrediction).map(
    //         (suggestion): PlaceSuggestion => ({
    //           name: suggestion.placePrediction.text.text,
    //           placeId: suggestion.placePrediction.placeId,
    //         }),
    //       ) ?? []
    //     );
    //   },
    //   async getPlaceDetails({ placeId, sessionId }: GetPlaceDetailsOptions) {
    //     const response = await client.post(`places/${placeId}`, {
    //       placeId,
    //       sessionToken: sessionId,
    //     });
    //     return {
    //       name: response.result.name,
    //       address: response.result.formattedAddress,
    //       location: {
    //         lat: response.result.geometry.location.lat,
    //         lng: response.result.geometry.location.lng,
    //       },
    //     };
    //   },
    //   async getPlacePhoto({ photoReference, maxWidth, maxHeight }: GetPlacePhotoOptions) {
    //     const response = await client.post(`places/${photoReference}/media`, {
    //       photoReference,
    //       maxWidth,
    //       maxHeight,
    //     });
    //     return response.photo;
    //   },
  };
}

function isPlacePrediction(
  suggestion: protos.google.maps.places.v1.AutocompletePlacesResponse.ISuggestion,
): suggestion is GooglePlaceSuggestion {
  return !!(suggestion.placePrediction?.text?.text && suggestion.placePrediction?.placeId);
}

export type PlacesService = ReturnType<typeof createPlacesService>;

type GooglePlaceSuggestion = { placePrediction: { text: { text: string }; placeId: string } };

export type PlaceAutocompleteRequest = {
  /**
   * The text string on which to search, for example: "pizza near Syd".
   * This field is required.
   */
  input: string;

  /**
   * The latitude/longitude around which to retrieve place information.
   * This must be specified as latitude,longitude.
   */
  location?: string;

  /**
   * Defines the distance (in meters) within which to bias place results.
   * The maximum allowed radius is 50,000 meters.
   */
  radius?: number;

  /**
   * Specifies one or more types of places to include in the autocomplete results.
   * Multiple types can be separated by a pipe (|).
   */
  types?: string;

  /**
   * Specifies the language in which to return results.
   * See the list of supported languages and their codes.
   */
  language?: string;

  /**
   * The region code, specified as a ccTLD ("top-level domain") two-character value.
   * Most ccTLD codes are identical to ISO 3166-1 codes, with some exceptions.
   */
  components?: string;

  /**
   * A string token identifying the session for billing purposes.
   * This should be unique for each user session.
   */
  sessionToken?: string;

  /**
   * A boolean flag indicating whether to restrict the results to the bounds specified by `location` and `radius`.
   * If false or not specified, results are biased rather than restricted.
   */
  strictbounds?: boolean;

  /**
   * A boolean flag indicating whether to return only geocoding results (like addresses) rather than business results.
   */
  geocode?: boolean;

  /**
   * A boolean flag indicating whether to return only business results rather than geocoding results.
   */
  establishment?: boolean;
};

// Nearby Search
export type NearbySearchRequest = {
  /**
   * The text string on which to search, for example: "restaurant" or "123 Main Street".
   * This field is required unless you provide a `location` and `radius`.
   */
  query?: string;

  /**
   * The latitude/longitude around which to retrieve place information.
   * This must be specified as latitude,longitude.
   */
  location?: string;

  /**
   * Defines the distance (in meters) within which to return place results.
   * The maximum allowed radius is 50,000 meters.
   */
  radius?: number;

  /**
   * Restricts results to only those places within the specified range.
   * Valid values are in the range from `0` to `5` where `0` means open now,
   * `1` means open at the time specified in the `open_now` parameter,
   * `2` means open in 7 days, `3` means open in 14 days,
   * `4` means open in 30 days, and `5` means open in 90 days.
   */
  open_now?: boolean | number;

  /**
   * Specifies the minimum rating for the place to be returned.
   */
  minprice?: number;

  /**
   * Specifies the maximum rating for the place to be returned.
   */
  maxprice?: number;

  /**
   * One or more type strings. Restricts the results to places matching at least one of the specified types.
   * Examples include 'restaurant', 'bar', 'cafe', etc.
   */
  type?: string | string[];

  /**
   * The language code, indicating in which language the results should be returned, if possible.
   */
  language?: string;

  /**
   * The region code, specified as a ccTLD ("top-level domain") two-character value.
   * Most ccTLD codes are identical to ISO 3166-1 codes, with some exceptions.
   */
  region?: string;

  /**
   * The page token from a previous Nearby Search request which you want to continue from.
   */
  pagetoken?: string;
};

// Text Search
export type TextSearchRequest = {
  /**
   * The text string on which to search, for example: "pizza in New York" or "shoe stores near Ottawa".
   * This field is required.
   */
  query: string;

  /**
   * The latitude/longitude around which to retrieve place information.
   * This must be specified as latitude,longitude.
   */
  location?: string;

  /**
   * Defines the distance (in meters) within which to return place results.
   * The maximum allowed radius is 50,000 meters.
   */
  radius?: number;

  /**
   * Specifies one or more types of places to include in the results.
   * Multiple types can be separated by a pipe (|).
   */
  type?: string;

  /**
   * Restricts results to only those places that are open now.
   * If true, only open places will be returned.
   */
  open_now?: boolean;

  /**
   * Specifies the minimum price level for the place to be returned.
   * Valid values are `0` (free) to `4` (most expensive).
   */
  minprice?: number;

  /**
   * Specifies the maximum price level for the place to be returned.
   * Valid values are `0` (free) to `4` (most expensive).
   */
  maxprice?: number;

  /**
   * Specifies the language in which to return results.
   * See the list of supported languages and their codes.
   */
  language?: string;

  /**
   * The region code, specified as a ccTLD ("top-level domain") two-character value.
   * Most ccTLD codes are identical to ISO 3166-1 codes, with some exceptions.
   */
  region?: string;

  /**
   * Specifies if only places with a website should be returned.
   */
  has_website?: boolean;

  /**
   * The page token from a previous Text Search request which you want to continue from.
   */
  pagetoken?: string;
};

export type PlaceDetailsRequest = {
  /**
   * A textual identifier that uniquely identifies a place.
   * This is usually obtained from a previous search request.
   */
  place_id: string;

  /**
   * A comma-separated list of field names to return.
   * If unspecified, all fields will be returned.
   */
  fields?: string;

  /**
   * The language in which to return results.
   * See the list of supported languages and their codes.
   */
  language?: string;

  /**
   * The region code, specified as a ccTLD ("top-level domain") two-character value.
   * Most ccTLD codes are identical to ISO 3166-1 codes, with some exceptions.
   */
  region?: string;

  /**
   * A string token identifying the session for billing purposes.
   * This should be unique for each user session.
   */
  sessionToken?: string;
};

export type PlacePhotosRequest = {
  /**
   * A string identifier that uniquely identifies a photo for a place.
   * This is obtained from a Places API response (Place Details, Nearby Search, or Text Search).
   */
  photoreference: string;

  /**
   * Specifies the maximum desired height, in pixels, of the image returned.
   * If not specified, the image will be returned in its original size.
   */
  maxheight?: number;

  /**
   * Specifies the maximum desired width, in pixels, of the image returned.
   * If not specified, the image will be returned in its original size.
   */
  maxwidth?: number;
};
