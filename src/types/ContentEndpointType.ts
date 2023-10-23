export interface ContentEndpointRoot {
  meta: Meta;
  response: Response;
}

export interface Response {
  response: string[];
}

export interface Meta {
  uuid: string;
  errors: Error[];
}

export interface Error {
  code: number;
  type: string;
  message: string;
  name: string;
}
