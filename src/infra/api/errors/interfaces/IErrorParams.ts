export interface IErrorParams {
  path: string;
  spec: {
    strip: boolean;
    strict: boolean;
    abortEarly: boolean;
    recursive: boolean;
    disableStackTrace: boolean;
    nullable: boolean;
    optional: boolean;
    coerce: boolean;
  };
}
