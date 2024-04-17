import React from "react";
import "./index.scss";
import Title from "./containers/Title";

export default function AppContent() {
  return (
    <div className="text-3xl mx-auto max-w-6xl">
      <h1 className="text-red-600">Dòng text màu đỏ từ folder home</h1>
      <Title />
    </div>
  );
}
