import React from "react";
import { CodePenLogo, GitHubLogo, LinkedInLogo } from "./footer-icons";
import "./Footer.css";

interface IFooterProps {
  darkMode: boolean;
}

const Footer = (props: IFooterProps) => {
  const darkMode = props.darkMode;
  const backgroundColor = darkMode ? "#3d348b" : "#d5ac4e";
  const foregroundColor = darkMode ? "#f9db6d" : "#6f1d1b";

  return (
    <div className="footer">
      <a
        className="footer-item"
        href="https://www.linkedin.com"
      >
        <div className="footer-icon">
          <LinkedInLogo
            background={backgroundColor}
            foreground={foregroundColor}
          />
        </div>
        <div className="footer-text">LinkedIn</div>
      </a>
      <a
        className="footer-item"
        href="https://github.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="footer-icon">
          <GitHubLogo
            background={backgroundColor}
            foreground={foregroundColor}
          />
        </div>
        <div className="footer-text">GitHub</div>
      </a>
      <a className="footer-item" href="https://codepen.io">
        <div className="footer-icon">
          <CodePenLogo
            background={backgroundColor}
            foreground={foregroundColor}
          />
        </div>
        <div className="footer-text">CodePen</div>
      </a>
    </div>
  );
};

export default Footer;
