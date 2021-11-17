import React, { memo } from "react";
import Drawer from "@material-ui/core/Drawer";
import RightArrowIcon from "@material-ui/icons/ArrowForwardIos";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import { Grid, IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import ReportsCircularProgress from "../progress/ProgressSpinner.js";
import { translation } from "@carrier/ngecat-reactcomponents";
import useReportManagerStyles from "./ReportsManager.styles.js";

/**
 * @category Render a drawer containing a list of current generated reports.
 * For each report, the displayed data is :
 * - Model and size
 * - Date of generation
 * - Additional hovering information (e.g number of pages, selected options, brand)
 *
 * The following actions are possible :
 * - Preview a report
 * - Download a report
 * @param {boolean} {open} Opening boolean
 * @param {function} {onClose} Closing callback
 * @param {date} {reports[].creationDate} Date of first generation of the report
 * @param {string} {reports[].description} Sentence describing current state (e.g : In progress)
 * @param {JSX.Element} {reports[].details} Additional information, that will appear when hovering the report title
 * @param {number} {reports[].loadingSpeedFactor} Represents the loading percentage progress speed of the report
 * @param {string} {reports[].model} Model of the report
 * @param {string} {reports[].status} Status of the report. Can have multiple values : LOADING, WARNING, FAILED, COMPLETED, DOWNLOADED, DOWNLOADING. Should be in the STATUS_CONSTANTS input parameter
 * @param {function} {downloadReport} Download report callback. Contains report object as unique paramater
 * @param {function} {previewReport} Preview report callback. Contains report object as unique paramater
 * @param {function} {STATUS_CONSTANTS} Status constants. Should contain the following values : LOADING, WARNING, FAILED, COMPLETED, DOWNLOADED, DOWNLOADING.
 * @returns {JSX.Element} Drawer component with a list of current reports
 * @author Samy Belaloui-Bertot
 * @see https://scegithub.apps.carrier.com/SCE/NGECAT-PackagedChillersEMEA/tree/develop/docs/tutorials/reports/reports-manager.md
 */
const ReportsManager = (props) => {
  const {
    open,
    onClose,
    reports,
    downloadReport,
    previewReport,
    STATUS_CONSTANTS: {
      LOADING,
      WARNING,
      FAILED,
      COMPLETED,
      DOWNLOADED,
      DOWNLOADING,
    },
  } = props;

  const classes = useReportManagerStyles();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      elevation={3}
      anchor="right"
      BackdropProps={{ invisible: true }}
    >
      <div className={classes.reportsManagerWrapper}>
        <div className={`${classes.action} ${classes.backButtonContainer}`}>
          <IconButton onClick={onClose} className={classes.backButton}>
            <RightArrowIcon className={classes.buttonIcon} />
          </IconButton>
        </div>
        <section className={classes.reportsManager}>
          <h3 className={classes.title}>{translation("MyReports")}</h3>
          <div className={classes.reportsItemsContainer}>
            {reports &&
              Array.isArray(reports) &&
              reports.map((report, i) => (
                <section
                  className={classes.reportItem}
                  key={`report-${i}-${report.creationDate}`}
                >
                  <Grid container>
                    <Grid item sm={9}>
                      <div className={`${classes.info}`}>
                        <Tooltip title={report.details}>
                          <Button className={classes.modelButton}>
                            {report.model}
                          </Button>
                        </Tooltip>

                        <Tooltip title={translation("Report preview")}>
                          <IconButton
                            onClick={() => previewReport(report)}
                            className={`${classes.action} ${classes.reportPreviewButton}`}
                          >
                            <VisibilityIcon className={classes.buttonIcon} />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div className={`${classes.info} date`}>{`${new Date(
                        report.creationDate
                      ).toLocaleDateString()} ${new Date(
                        report.creationDate
                      ).toLocaleTimeString()}`}</div>
                    </Grid>
                    <Grid item sm={3}>
                      <div className={`${classes.info} status`}>
                        {(report.status === LOADING ||
                          report.status === DOWNLOADING) && (
                          <div className={classes.statusIcon}>
                            <ReportsCircularProgress
                              status={report.status}
                              creationDate={report.creationDate}
                              loadingSpeedFactor={report.loadingSpeedFactor}
                              {...props}
                            />
                          </div>
                        )}
                        {(report.status === COMPLETED ||
                          report.status === DOWNLOADED) && (
                          <Tooltip title={translation(report.description)}>
                            <IconButton
                              className={`${classes.action}`}
                              onClick={() => downloadReport(report)}
                            >
                              <GetAppIcon className={classes.statusIcon} />
                            </IconButton>
                          </Tooltip>
                        )}
                        {(report.status === WARNING ||
                          report.status === FAILED) && (
                          <Tooltip title={translation(report.description)}>
                            <IconButton className={`${classes.alert}`}>
                              <ErrorOutlineOutlinedIcon
                                className={`${
                                  report.status === WARNING
                                    ? "warning"
                                    : "error"
                                } ${classes.statusIcon}`}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </section>
              ))}
          </div>
        </section>
      </div>
    </Drawer>
  );
};
export default memo(ReportsManager);
