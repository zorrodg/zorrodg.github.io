"use strict";

/**
 * Gallery Component view. Renders gallery
 *
 * @author Andrés Zorro <zorrodg@gmail.com>
 * @package zorrodg.portfolio
 * @module portfolio.components.gallery
 */

// Module dependencies
import React from "react";
import _ from "lodash";

// Module exports
export default function () {
  let data = this.props.data;

  return (
    <ul className="gallery">
    {
      _.map(data, (media, i) => {
        let element;
        switch (media.type){
          case "youtube":
            element = <div className="youtube">Youtube! {media.src}</div>;
            break;
          case "vimeo":
            element = <div className="vimeo">vimeo! {media.src}</div>;
            break;
          default:
            element = <a href={media.src}>{media.src}</a>;
            break;
        }

        return <li key={i} className="gallery-item">{element}</li>;
      })
    }
    </ul>
  );
}
