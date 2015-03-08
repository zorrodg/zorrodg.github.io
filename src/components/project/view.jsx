"use strict";

/**
 * Project Component view. Renders project widget
 *
 * @author Andrés Zorro <zorrodg@gmail.com>
 * @package zorrodg.portfolio
 * @module portfolio.components.project
 */

// Module dependencies
import React from "react";
import _ from "lodash";
import Skill from "./../skill/main.jsx";
import Gallery from "./../gallery/main.jsx";

// Module exports
export default function () {
  let data = this.props.data;

  return (
    <article className="project">

      <h2>{data.name}</h2>

      <Gallery data={data.media} />

      <p>{data.description}</p>

      {
        _.map(data.technologies, skill => {
          return <Skill key={skill.tech_id} name={skill.name} />;
        })
      }
    </article>
  );
}
