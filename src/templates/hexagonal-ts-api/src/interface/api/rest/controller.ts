import { HttpResponse } from '@interface/api/rest';

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
