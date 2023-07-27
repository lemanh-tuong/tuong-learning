import React, {
  Component as RComponent,
  ComponentType,
  HTMLAttributes
} from "react";
import { CreateStateInterface, UnSubscribe } from "./createState";

interface MapStateDefault {
  getState: CreateStateInterface["getState"];
  subscribe: CreateStateInterface["subscribe"];
}

function getStates<T extends Record<string, MapStateDefault>>(
  mapStateToProps: T
) {
  return Object.keys(mapStateToProps).reduce<
    Record<string, CreateStateInterface["getState"]>
  >((obj, key) => {
    return {
      ...obj,
      [key]: mapStateToProps[key].getState()
    };
  }, {});
}

export default function withState<T extends Record<string, MapStateDefault>>(
  mapStateToProps: T
) {
  return <P extends object = {}>(
    Component: ComponentType<P & HTMLAttributes<HTMLElement>>
  ) => {
    class WithState extends RComponent<Omit<P, keyof T>> {
      private unsubs: UnSubscribe[];

      constructor(props: P) {
        super(props);
        this.state = {
          ...getStates(mapStateToProps)
        };
        this.unsubs = Object.keys(mapStateToProps).map<UnSubscribe>((key) => {
          return mapStateToProps[key].subscribe(this.handleSubscribe);
        });
      }

      public componentWillUnmount() {
        this.unsubs.forEach((unsub) => {
          unsub();
        });
      }

      private handleSubscribe = () => {
        this.setState({
          ...getStates(mapStateToProps)
        });
      };

      public render() {
        return <Component {...(this.state as P)} {...this.props} />;
      }
    }
    return WithState;
  };
}
