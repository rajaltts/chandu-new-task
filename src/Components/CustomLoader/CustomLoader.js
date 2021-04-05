import React from 'react';
import { css } from '@emotion/core';
import { HashLoader } from 'react-spinners';
import { Dialog } from '@material-ui/core';
import './CustomLoader.css';

const override = css`
    margin: auto;
`;

function CustomLoader(props) {
    const { showLoaderImage, loadertext, visible } = props;
    // to-do: remove hash loader and keep new loader
    return (
        (visible) ?
            <Dialog className="customLoad">
                <p>
                    {(showLoaderImage) && <HashLoader css={override} sizeUnit={"px"} size={25} color={'ffffff'} loading={true} />}
                    {(loadertext) && <b><font size="6">{loadertext}</font></b>}
                </p>
            </Dialog>
            :
            null
    )
};

export default React.memo(CustomLoader);