import React from "react";

import Todos from "./pages/todos";
import { Route } from "./libs/ScratchRouter/Route";
import { Router } from "./libs/ScratchRouter/Router";
import TodoDetail from "./pages/todo";

interface AppProps {
  initialPath: string;
}

export const App = ({ initialPath }: AppProps) => {
  return (
    <Router initialPath={initialPath}>
      <Route path="/todos">
        <Todos />
      </Route>
      <Route path="/todo">
        <TodoDetail />
      </Route>
    </Router>
  );
};
