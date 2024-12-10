import type { AnyObject } from '@unicornify/utils';

export function createLazyContainer<Values extends AnyObject>(
  options: CreateLazyContainerOptions<Values>,
): LazyContainer<Values> {
  const cache: { [Key in keyof Values]?: Values[Key] } = {};

  function getValue<Key extends keyof Values>(key: Key): Values[Key] {
    return cache[key] ?? (cache[key] = options[key]({ get: getValue }));
  }
  return {
    get: getValue,
    register: (key, factory) => {
      options[key] = factory;
    },
  };
}

export type LazyContainer<Values extends AnyObject> = {
  get: <Key extends keyof Values>(key: Key) => Values[Key];
  register: <Key extends keyof Values>(
    key: Key,
    factory: CreateLazyContainerOptions<Values>[Key],
  ) => void;
};

export type CreateLazyContainerOptions<Values extends AnyObject> = {
  [Key in keyof Values]: (options: InitOptions<Values>) => Values[Key];
};

export type InitOptions<Values extends AnyObject> = {
  get: <Key extends keyof Values>(key: Key) => Values[Key];
};
