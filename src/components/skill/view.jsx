"use strict";

/**
 * Skill Component view. Renders skill widget
 *
 * @author Andrés Zorro <zorrodg@gmail.com>
 * @package zorrodg.portfolio
 * @module portfolio.components.skill
 */

// Module dependencies
import React from "react";

// Module exports
export default function () {
  return (
    <div className="skill">{this.props.name}</div>
  );
}
