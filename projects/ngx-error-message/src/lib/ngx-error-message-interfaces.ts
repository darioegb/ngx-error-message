export type JsonMessage<T> = Record<string,T> | Record<string, Record<string, T>>;
export type StringOrNumberOrNull = string | number | null;
