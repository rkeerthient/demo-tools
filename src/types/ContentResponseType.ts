export interface ContentResponseRoot {
  meta: Meta;
  response: Response;
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

export interface Response {
  docs: Doc[];
  count: number;
  nextPageToken: string;
}

export interface Doc {
  $key: Key;
  id: string;
  name: string;
}

export interface Key {
  locale: string;
  primary_key: string;
}
