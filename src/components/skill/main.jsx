"use strict";

/**
 * Skill Component controller
 *
 * @author Andres Zorro <zorrodg@gmail.com>
 * @package zorrodg.portfolio
 * @module portfolio.components.skill
 */

// Module dependencies
import React from "react";
import state from "./state.js";
import view from "./view.jsx";

// Module exports
export default React.createClass({
  getInitialState: state.init,
  render: view
});

