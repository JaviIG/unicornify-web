import type { InternalApi } from 'nitropack';

export type LocalApi = {
  get: ExtractPaths<'get'>;
  post: ExtractPaths<'post'>;
  put: ExtractPaths<'put'>;
  delete: ExtractPaths<'delete'>;
};

type ExtractPaths<SomeMethod extends 'get' | 'post' | 'put' | 'delete' | 'default'> = {
  [Path in keyof InternalApi as SomeMethod extends keyof InternalApi[Path]
    ? Path
    : never]: InternalApi[Path][SomeMethod & keyof InternalApi[Path]];
};
