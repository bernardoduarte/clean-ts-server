export interface Controller {
  handle: () => Promise<any>;
}
