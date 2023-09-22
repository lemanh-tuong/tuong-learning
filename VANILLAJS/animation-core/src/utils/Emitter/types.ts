export type Id = number;
export interface Observer<ListenerT> {
  id: number;
  listener: ListenerT;
}
export type Observers<ListenerT> = Observer<ListenerT>[];
export interface DefaultEvents {
  [eventType: string]: Observers<(data: any) => void>;
}
export type ArrayElement<A> = A extends (infer T)[] ? T : never;
export type Args<T> = T extends (args: infer D) => void ? D : never;
export type CreateEvents<T extends Record<string, any>> = { [key in keyof T]: Observers<T[key]> };

export interface Subject<EventsT extends DefaultEvents> {
  on<E extends keyof EventsT>(eventType: E, listener: ArrayElement<EventsT[E]>['listener']): Id;
  off(id: Id): void;
  emit<E extends keyof EventsT>(eventType: E, data: Args<ArrayElement<EventsT[E]>['listener']>): void;
}
