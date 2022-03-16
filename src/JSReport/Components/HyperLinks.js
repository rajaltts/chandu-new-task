import React from 'react';
import reportStyles from "./reportStyles";
import Link from '@material-ui/core/Link';
const HyperLinks = ({ href, type, value}) => {
    const {
      link,
      imgHeight
    } = reportStyles;
    const hrefAttributes = href ? {href: href} : {}
    return (
      <Link
        style={{ ...link }}
        rel="noopener noreferrer"
        {...hrefAttributes}
        target="_blank"
      >
        {type === "pdf" && <img src={value} style={imgHeight} />}
        {type === "link" && value}
      </Link>
    );
}
export default HyperLinks;