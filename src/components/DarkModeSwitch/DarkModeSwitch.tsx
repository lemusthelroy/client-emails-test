import React, { useState } from "react";
import "./DarkModeSwitch.css";

interface IDarkModeSwitch {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DarkModeSwitch = ({ darkMode, setDarkMode }: IDarkModeSwitch) => {
  const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    document.body.classList.add(darkMode ? "dark" : "light");
    document.body.classList.remove(!darkMode ? "dark" : "light");
    console.log(document.body.classList);
    setDarkMode(!darkMode);
  };

  return (
    <>
      <button
        className={` ${
          darkMode ? "toggle-box-on" : "toggle-box-off"
        } toggle-box`}
        onClick={(e) => {
          handleChange(e);
        }}
      >
        <div
          className={`unselectable stars ${
            darkMode ? "stars-on" : "stars-off"
          }`}
        >
          <div className="star star1">★</div>
          <div className="star star2">★</div>
          <div className="star star3">★</div>
        </div>
        <div
          className={`toggle ${darkMode ? "toggle-on" : "toggle-off"}`}
        ></div>
        <div className={`cloud ${darkMode ? "" : "cloud-off"}`}>☁︎</div>
        <div
          className={`stars-wrapper ${
            darkMode ? "stars-wrapper-on" : "stars-wrapper-off"
          }`}
        ></div>
      </button>
    </>
  );
};

export default DarkModeSwitch;
