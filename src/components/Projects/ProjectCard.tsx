import React, { useState } from "react";
import "./ProjectCard.css";

interface IProjectCard {
  image: string;
  title: string;
  description: string;
  link: string;
}

const ProjectCard = (props: IProjectCard) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="card-wrapper"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={() => setIsFlipped(!isFlipped)}
      tabIndex={0}
      role={"button"}
    >
      <div className={`${isFlipped ? "card-open" : ""} card `}>
        <div className="front">
          <div
            className="front-image"
            style={{ backgroundImage: `url(${props.image})` }}
          />
          <div className="card-title">{props.title}</div>
        </div>
        <div className="back">
          <div className="card-back-text">
            <div className="project-card-title">{props.title}</div>
            <p
              className={`${
                document.body.classList.contains("light") ? "light" : "dark"
              } project-card-description`}
              dangerouslySetInnerHTML={{
                __html: props.description.replace(/\n/g, "<br>"),
              }}
            ></p>
            {props.link !== "" ? (
              <a
                href={props.link}
                onClick={() => {
                  console.log("WTF");
                }}
                className="card-link"
              >
                Click here to view
              </a>
            ) : null}
            <div
              className={`${isFlipped ? "hidden" : null} clickable-link`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
