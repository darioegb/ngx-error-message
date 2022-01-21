export interface GenericObject<T> {
  [key: string]: T;
}

export type JsonMessage<T> = GenericObject<T> | GenericObject<GenericObject<T>>;
export type StringOrNumberOrNull = string | number | null;
