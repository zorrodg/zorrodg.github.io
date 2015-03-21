"use strict";

/**
 * Main App Container
 * @author Andrés Zorro <zorrodg@gmail.com>
 * @package zorrodg.portfolio
 */

// Module dependencies
import React from "react";
import _ from "lodash";
import Project from "./components/project/main.jsx";

// Test -------------------------------------------------------
// TODO: Figure out how to load async data to create components
import projectsData from "./../test/projects.json";

React.render((

  <section className="projects">
    {
      _.map(projectsData, (project) => {
        return <Project key={project.project_id} data={project} />;
      })
    }
  </section>

  ), document.querySelector("#app"));

export default {};
