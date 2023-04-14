import React from "react";
import * as ReactDOMClient from "react-dom/client";

import "./css/main.css";
import "./css/background.css";
import Page from "./page.js";
import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = (event) => {
    fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setError(true)
          throw new Error("Ошибка при запросе данных");

        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data["access_token"]);
        app.render(<Page />);
      });
    event.preventDefault();
  };

  return (
    
    <form className="login-form" onSubmit={handleSubmit}>
       {error && <div className="unLogin">Неверный логин или пароль</div>}
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

const token = localStorage.getItem("token");

const app = ReactDOMClient.createRoot(document.getElementById("app"));

if (token) {
  localStorage.removeItem("guid");
  fetch(`${process.env.REACT_APP_API_URL}auth/velvet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access_token: token }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при запросе данных");
      }
      return response.json();
    })
    .then((data) => {
      console.log("🚀 ~ file: index.js:81 ~ data:", data);
      if (data["is_valid_token"] === true) {
        app.render(<Page />);
      } else {
        app.render(<LoginForm />);
      }
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  app.render(<LoginForm />);
}
