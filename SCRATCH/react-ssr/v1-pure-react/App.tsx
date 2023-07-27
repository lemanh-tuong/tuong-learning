import React from "react";

import Todos from "./pages/todos";
import { Route } from "./libs/ReactRouter/Route";
import { Router } from "./libs/ReactRouter/Router";
import TodoDetail from "./pages/todo";

interface AppProps {
  initialPath: string;
}

export const App = ({ initialPath }: AppProps) => {
  return (
    <Router initialPath={initialPath}>
      <Route path="/todos">
        <Todos todos={[]} />
      </Route>
      <Route path="/todo">
        <TodoDetail />
      </Route>
    </Router>
  );
};
