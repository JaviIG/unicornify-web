import { defineEventHandler } from 'h3';
import {
  createPlacesService,
  type PlacesService,
} from '~~/layers/places/server/services/places.service';

declare module '~~/server/container.types' {
  export interface ContainerValues {
    placesService: PlacesService;
  }
}

export default defineEventHandler(async (event) => {
  event.context.container.register('placesService', () => {
    return createPlacesService();
  });
});
