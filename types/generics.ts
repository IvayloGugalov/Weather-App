export enum Types {
  MAKE_REQUEST = 'make-request',
  GET_DATA = 'get-data',
  ERROR = 'error',
}

export type Action<TData> = {
  type: Types.ERROR | Types.GET_DATA | Types.MAKE_REQUEST;
  payload: {
    data: TData | null;
    loading: boolean;
    error: string | null
  }
}

export type State<TData> = {
  data: TData | null;
  loading: boolean;
  error: string | null
}
