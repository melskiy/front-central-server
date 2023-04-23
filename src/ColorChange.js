import "./css/Column.css";

function ButtonColorChange(isInt) {
  if (isInt) {
    const buttons = document.querySelectorAll(".intent");
    buttons.forEach((button) => {
      button.style.background = "red";
      button.style.pointerEvents = "all";
    });
  } else {
    const buttons = document.querySelectorAll(".intent");

    buttons.forEach((button) => {
      button.style.removeProperty("background");
      button.style.pointerEvents = "none";
    });
  }
}

export default ButtonColorChange;
