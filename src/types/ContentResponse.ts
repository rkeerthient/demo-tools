export interface Root {
  meta: Meta;
  response: Response;
}

export interface Meta {
  uuid: string;
  errors: any[];
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
