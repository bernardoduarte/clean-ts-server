import { HttpResponse } from '@/presentation/protocols';

export interface Controller {
  handle: () => Promise<HttpResponse>;
}
