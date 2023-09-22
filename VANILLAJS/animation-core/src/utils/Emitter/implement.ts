import { each, filter } from "../fastLoop";
import { Args, ArrayElement, DefaultEvents, Id, Subject } from "./types";

export class Emitter<EventsT extends DefaultEvents>
  implements Subject<EventsT>
{
  private id: Id;

  private events: EventsT;

  constructor() {
    this.id = 0;
    this.events = {} as EventsT;
  }

  public on<E extends keyof EventsT>(
    eventType: E,
    listener: ArrayElement<EventsT[E]>["listener"]
  ) {
    this.id++;
    this.events = {
      ...this.events,
      [eventType]: [
        ...(this.events[eventType] || []),
        {
          listener,
          id: this.id,
        },
      ],
    };
    return this.id;
  }

  public off(id: Id) {
    for (const eventType in this.events) {
      this.events = {
        ...this.events,
        [eventType]: filter(this.events[eventType], (item) => item.id !== id),
      };
    }
  }

  public emit<E extends keyof EventsT>(
    eventType: E,
    data: Args<ArrayElement<EventsT[E]>["listener"]>
  ) {
    if (this.events[eventType]) {
      each(this.events[eventType], ({ listener }) => {
        listener(data);
      });
    }
  }
}
