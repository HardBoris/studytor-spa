import React from "react";
import "./styles/global.css";
import "./styles/layout.css";
import { AppRouter } from "./routes";

function App() {
  return (
    <>
      <header></header>
      <main>
        <AppRouter />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
