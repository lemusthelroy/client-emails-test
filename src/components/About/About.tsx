import React from "react";
import "./About.css";
import {
  PythonLogo,
  TypescriptLogo,
  ReactLogo,
  HTMLLogo,
  CSSLogo,
  TailwindLogo,
  CSharpLogo,
} from "./logos";

interface IAbout {
  darkMode: boolean;
}

const About = (props: IAbout) => {
  const darkMode = props.darkMode;
  const backgroundColor = darkMode ? "#3d348b" : "#d5ac4e";
  const foregroundColor = darkMode ? "#f9db6d" : "#6f1d1b";
  return (
    <div className="about">
      <div className="about-areas">
        <div className="about-info">
          <div className="about-title">About</div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at arcu odio. Aenean ullamcorper vel erat id tempus. Proin mollis tristique egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum aliquet velit et felis auctor, eu elementum sapien semper. Ut scele.
        </div>
        <div className="about-info">
          <div className="about-title">Education</div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at arcu odio. Aenean ullamcorper vel erat id tempus. Proin mollis tristique egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum aliquet velit et felis auctor, eu elementum sapien semper. Ut scele
        </div>
        <div className="about-info">
          <div className="about-title">Skills</div>
          <div className="languages">
            <div className="language-item">
              <div className="logo">
                <PythonLogo
                  background={backgroundColor}
                  foreground={foregroundColor}
                />
              </div>
              <span>Python</span>
            </div>
            <div className="language-item">
              <div className="logo">
                <TypescriptLogo
                  background={backgroundColor}
                  foreground={foregroundColor}
                />
              </div>
              <span>
                Typescript <span className="sep">/</span> Javascript
              </span>
            </div>
            <div className="language-item">
              <div className="logo">
                <ReactLogo
                  background={backgroundColor}
                  foreground={foregroundColor}
                />
              </div>
              <span>React</span>
            </div>
            <div className="language-item">
              <div className="logo">
                <CSharpLogo
                  background={backgroundColor}
                  foreground={foregroundColor}
                />
              </div>
              <span>C Sharp</span>
            </div>
            <div className="language-item">
              <div className="logo">
                <HTMLLogo
                  background={backgroundColor}
                  foreground={foregroundColor}
                />
              </div>
              <span>HTML</span>
            </div>
            <div className="language-item">
              <div className="logo">
                <CSSLogo
                  background={backgroundColor}
                  foreground={foregroundColor}
                />
              </div>
              <span>CSS</span>
            </div>
            <div className="language-item">
              <div className="logo">
                <TailwindLogo
                  background={backgroundColor}
                  foreground={foregroundColor}
                />
              </div>
              <span>Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
