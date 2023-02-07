import React, { useEffect, useRef, useState } from "react";
import "./HamburgerMenu.css";

interface IHamburgerMenuProps {
  setPage: (location: string) => void;
}

const HamburgerMenu = ({ setPage: setRef }: IHamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
  });

  return (
    <>
      <div className={`${isOpen ? "dim" : ""}`} />
      <button
        className={`hamburger ${
          isOpen ? "hamburger-open" : "hamburger-closed"
        }`}
        onClick={() => {
          openMenu();
        }}
        ref={menuRef}
      >
        <button
          onClick={isOpen ? () => setRef("home") : undefined}
          className={`item item-1 ${
            isOpen ? "item-1-open item-open" : "item-1-closed item-closed"
          }`}
        >
          <div
            className={` ${isOpen ? "content-open" : "content-closed"} content`}
          >
            Home
          </div>
        </button>
        <button
          onClick={isOpen ? () => setRef("about") : undefined}
          className={`item item-2 ${
            isOpen ? "item-2-open item-open" : "item-2-closed item-closed"
          }`}
        >
          <div
            className={`content ${isOpen ? "content-open" : "content-closed"}`}
          >
            About
          </div>
        </button>
        <button
          onClick={isOpen ? () => setRef("projects") : undefined}
          className={`item item-3 ${
            isOpen ? "item-3-open item-open" : "item-3-closed item-closed"
          }`}
        >
          <div
            className={`content ${isOpen ? "content-open" : "content-closed"}`}
          >
            Projects
          </div>
        </button>
        <button
          onClick={isOpen ? () => setRef("contact") : undefined}
          className={`item item-4 ${
            isOpen ? "item-4-open item-open" : "item-4-closed item-closed"
          }`}
        >
          <div
            className={`content ${isOpen ? "content-open" : "content-closed"}`}
          >
            Contact
          </div>
        </button>
      </button>
    </>
  );
};

export default HamburgerMenu;
