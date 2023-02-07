import React, { useEffect, useRef, useState } from "react";
import About from "./About/About";
import Contact from "./Contact/Contact";
import DarkModeSwitch from "./DarkModeSwitch/DarkModeSwitch";
import Footer from "./Footer/Footer";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import Home from "./Home/Home";
import "./Homescreen.css";
import Projects from "./Projects/Projects";

const Homescreen = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setDarkMode(colorScheme == "dark" ? false : true);
    document.body.classList.add(colorScheme);
  }, []);

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        setDarkMode(colorScheme == "dark" ? false : true);
      });
  });

  const homeRef = useRef<null | HTMLDivElement>(null);
  const aboutRef = useRef<null | HTMLDivElement>(null);
  const projectsRef = useRef<null | HTMLDivElement>(null);
  const contactRef = useRef<null | HTMLDivElement>(null);

  const setRef = (location: string) => {
    if (location === "home") {
      homeRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (location === "about") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (location === "projects") {
      projectsRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (location === "contact") {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`${darkMode ? "" : "dark"} main-homescreen`}>
      <div className="homescreen">
        <header className="header">
          <div className="hamburger-wrapper">
            <HamburgerMenu setPage={setRef} />
          </div>
          <div className="switch-wrapper" ref={homeRef}>
            <DarkModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </header>
        <div className={`${darkMode ? "dark" : ""} main`}>
          <div className="main-content">
            <div className="home-wrapper" ref={homeRef}>
              <Home setRef={setRef} />
            </div>
            <div className="about-wrapper" ref={aboutRef}>
              <About darkMode={darkMode} />
            </div>
            <div className="projects-wrapper" ref={projectsRef}>
              <Projects />
            </div>
            <div className="contact-wrapper" ref={contactRef}>
              <Contact />
            </div>
          </div>
        </div>
        <footer className="footer-wrapper">
          <Footer darkMode={darkMode} />
        </footer>
      </div>
    </div>
  );
};

export default Homescreen;
