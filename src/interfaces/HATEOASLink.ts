type HTTPMethod =
  'GET' |
  'POST' |
  'PUT' |
  'DELETE' |
  'PATCH';

export interface IHATEOASLink {
  href: string;
  method: HTTPMethod;
}