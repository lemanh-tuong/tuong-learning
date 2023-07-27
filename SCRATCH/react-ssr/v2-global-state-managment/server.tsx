import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import express from "express";
import { readdirSync } from "fs";
import { join } from "path";
import { Todo } from "./types/models/Todo";

const app = express();

app.use(express.static("./dist"));

const pages = readdirSync(join(process.cwd(), "pages")).map(
  (p) => p.split(".")[0]
);

pages.forEach((page) => {
  app.get(`/${page}`, async (req, res) => {
    const file = await import(`./pages/${page}`);
    const Component = file.default;
    let props = {};
    if (file.getServerSideProps) {
      props = await file.getServerSideProps(req, res);
    }
    const { pipe } = renderToPipeableStream(
      <body>
        <div id="root">
          <Component {...props} />
        </div>
        {/* <script src="/client.js"></script> */}
      </body>,
      { bootstrapScripts: ["/client.js"] }
    );

    pipe(res);
  });
});

let todos: Todo[] = [
  {
    _id: "1",
    description: "Todo 1",
    title: "Todo 1",
    iconUrl: "https://picsum.photos/20",
  },
  {
    _id: "2",
    description: "Todo 2",
    title: "Todo 2",
    iconUrl: "https://picsum.photos/20",
  },
  {
    _id: "3",
    description: "Todo 3",
    title: "Todo 3",
    iconUrl: "https://picsum.photos/20",
  },
];

app.get("/api/todos", (_, res) => {
  res.json(todos);
});

app.get("/api/todo/:id", (req, res) => {
  res.json(todos.find((todo) => todo._id === req.params.id));
});

app.listen(3000, () => {
  console.info("App is live on :3000!");
});
