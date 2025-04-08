/**
 * @description This interface is used to format the response of the API.
 * It includes a success flag, message, data, and an optional error code.
 * @template T - The type of the data returned in the response.
 * @property {boolean} success - Indicates if the request was successful.
 * @property {string} message - A message describing the result of the request.
 * @property {T} data - The data returned from the request.
 * @property {string | null} errorCode - An optional error code, if applicable.
 */
export interface FormattedResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode: string | null;
}
