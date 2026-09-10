export type JsonMessage<T> =
  Record<string, T> | Record<string, Record<string, T>>

export type ErrorWhenType =
  'dirty' | 'invalid' | 'pristine' | 'touched' | 'untouched'

export type ErrorPriority = string

export interface ClassNames {
  control: string
  message: string
}

export interface ErrorMessageConfig {
  validationsPrefix?: string
  patternsPrefix?: string
  errorMessages?: Record<string, string | Record<string, string>>
  errorPriority?: ErrorPriority[]
}

/** The provider-resolved shape of {@link ErrorMessageConfig}: every field defaulted. */
export interface ResolvedErrorMessageConfig {
  validationsPrefix: string
  patternsPrefix: string
  errorMessages: Record<string, string | Record<string, string>>
  errorPriority: ErrorPriority[]
}
