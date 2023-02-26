import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { useState } from "react";
import "./css/main.css";
import "./css/background.css";
import Chat from "./page";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    fetch("http://localhost:11000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 401) {
        console.log("pisya");
      } else {
        app.render(<Chat />);
      }
    });
    event.preventDefault();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        <input
          className="input1"
          placeholder="Логин"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        <input
          className="input1"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button className="login-button" type="submit">
        Войти
      </button>
    </form>
  );
}

const app = ReactDOMClient.createRoot(document.getElementById("app"));
app.render(<LoginForm />);
