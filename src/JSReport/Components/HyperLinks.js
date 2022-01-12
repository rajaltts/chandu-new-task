import React from 'react'
import Link from '@material-ui/core/Link';

function HyperLinks(props) {
    const { children, divClass, preTextClass, postTextClass, linkClass, component, underline, href, target, style, preText, postText } = props;

    return (
        <div className={divClass}>
            <pre>
               <span className={preTextClass}>{preText}</span>
                <Link
                    rel="noopener noreferrer"
                    className={linkClass}
                    {...props}
                >
                    {children}
                </Link>
                <span className={postTextClass}>{postText}</span>
            </pre>
        </div>
    )
}

export default HyperLinks;