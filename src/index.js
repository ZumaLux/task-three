import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//prevents page refresh on file change
// if (module.hot && process.env.NODE_ENV !== "production") {
//   module.hot.accept();
// }

// ReactDOM.render(<App />, document.querySelector("#root"));  //old version
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
