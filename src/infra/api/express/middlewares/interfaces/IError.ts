/* eslint-disable @typescript-eslint/no-explicit-any */
import { IErrorParams } from "./IErrorParams";

export interface IError {
  value: { [key: string]: any };
  path: string;
  type: string;
  errors: string[];
  params: IErrorParams;
  inner: any[];
  name: string;
  message: string;
}
