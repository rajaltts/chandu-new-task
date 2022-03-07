import React, { memo } from "react";
import ContentList from "./ContentList"
import ReportNotes from "./ReportNotes"
import reportStyles  from "../reportStyles";

const ContentTable = ({
    content,
    header,
    notes,
    notesType,
    classes = {}
}) => {
    return (
        <div style={reportStyles['contentTable']}>
            <ContentList
                content={content}
                header={header}
                classes={classes}
            />
            <ReportNotes
                notes={notes}
                type={notesType}
                classes={classes}
            />
        </div>
    );
};

export default memo(ContentTable);