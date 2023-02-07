import React from "react";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

interface IProject {
  title: string;
  description: string;
  img: string;
  link: string;
}

const Projects = () => {
  const projects: IProject[] = [
    {
      title: "ROUS",
      description:
        "For this project I was competing in a team to create a game in 24 hours for Kiwijam. \n\nI quickly learnt to use godot and GDScript to create the movement scripts for a player controlled character and working with the rest of my team we implemented a full soundtrack, custom artwork, and a laser drawn maze. \n\nWe were awarded runner-up for the most complete and most experimental categories.",
      link: "https://github.com/Team-ROUS",
      img: "/images/rous.jpg",
    },
    {
      title: "This Portfolio",
      description:
        "I designed and developed this portfolio website using TypeScript, React, CSS, and Express.js. \n\nMy goals for this project were to display some of my skills to potential employers, as well as to further my web development skills and experience",
      link: "https://github.com",
      img: "/images/react-logo.jpg",
    },
    {
      title: "Machine Learning Project",
      description:
        "I worked in a group to test different approaches to a task to find the most accurate method for modelling the given dataset. \n\nIn this project my focus was on the implementation and interpretation of a logistic regression learning model, as well as explainging how different factors impacted the final accuracy of the model. \n\nThe rest of my group focused on the other required methods: Naive Bayes, Support Vector Machine, and Neural Network approaches.",
      link: "",
      img: "/images/image-for-ml.jpg",
    },
    {
      title: "Web Development Assignment",
      description:
        "I created a small functional website with a front and back end for playing a game of chess online, as well as similar projects to view the courses available at the University of Auckland, and show a dynamic SVG graph of the number of students attending lectures online and in person",
      link: "",
      img: "/images/web-dev-project.jpg",
    },
  ];

  return (
    <div>
      <div className="projects-title">Some of my projects:</div>
      <div className="projects">
        {projects.map((e) => {
          return (
            <ProjectCard
              image={e.img}
              title={e.title}
              description={e.description}
              link={e.link}
              key={e.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
