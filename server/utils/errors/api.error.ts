import { type ErrorKind, ErrorMessages } from '~~/server/utils/errors/error.messages';

export class ApiError<Kind extends ErrorKind> extends Error {
  public readonly kind: Kind;
  public override readonly message: string;
  constructor(kind: Kind) {
    super();
    this.kind = kind;
    this.message = ErrorMessages[kind];
  }
}
