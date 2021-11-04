export interface GeocodeResponse {
  results: GeocodeResult[];
  status: GeocodeResponseStatus;
  plus_code: PlacePlusCode;
}

export interface GeocodeResult {
  formatted_address: string;
}

export const enum GeocodeResponseStatus {
  ERROR = 'ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',
  OK = 'OK',
  OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
  REQUEST_DENIED = 'REQUEST_DENIED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  ZERO_RESULTS = 'ZERO_RESULTS',
}

export interface PlacePlusCode {
  compound_code?: string;
  global_code: string;
}
