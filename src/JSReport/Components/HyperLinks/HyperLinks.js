import React from 'react';
import reportStyles from "../reportStyles";
import Link from '@material-ui/core/Link';
const HyperLinks = ({ preText = "",postText = "", type, value,href = "", style= {} }) => {
    const {
      link,
      imgHeight,
      preTextStyle,
      postTextStyle
    } = reportStyles;
    return (
      <div style={style}>
       { preText && <span style={preTextStyle}>{preText}</span>}
        <Link
          style={link}
          rel="noopener noreferrer"
          href={href}
          target="_blank"
        >
          {type === "pdf" && <img src={value} style={imgHeight} />}
          {type === "word" && <img src={value} style={imgHeight} />}
          {type === "link" && value}
        </Link>
        {postText && <span style={postTextStyle}>{postText}</span>}
      </div>
    );
}
export default HyperLinks;