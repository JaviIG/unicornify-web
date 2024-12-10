import { defineEventHandler } from 'h3';
import { createUserService, type UserService } from '../services/user.service';

declare module '~~/server/container.types' {
  export interface ContainerValues {
    userService: UserService;
  }
}

export default defineEventHandler(async (event) => {
  event.context.container.register('userService', ({ get }) => {
    return createUserService({ db: get('db') });
  });
});
