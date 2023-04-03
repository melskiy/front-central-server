import React from "react";
import { useState } from "react";
import "./css/LogoutButton.css";

function Logout() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    setIsLoggedOut(true); // установить флаг выхода в true
  };

  // перенаправить пользователя на страницу входа при выходе
  if (isLoggedOut) {
    localStorage.removeItem("token");
    localStorage.removeItem("guid");
    window.location.reload();
  }

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Выйти
      </button>
    </div>
  );
}

export default Logout;
