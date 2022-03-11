import React, { useState, useEffect, useRef } from "react";
import {
  ReportsCircularProgress as CircularProgress,
  usePercentageStyles,
} from "./ProgressSpinner.styles";

/** Display a variable speed circular progress spinner, with a percentage value.
 * This is an alternative solution for upgrading the user experience,
 * as we can't get the loading percentage value during reports calculation.
 * Speed can be adjust with the loadingSpeedFactor input parameter
 * @param {string} {status} Status of the report. Can have multiple values : LOADING, WARNING, FAILED, COMPLETED, DOWNLOADED, DOWNLOADING. Should be in the STATUS_CONSTANTS input parameter
 * @param {function} {creationDate} Date of the first report generation
 * @param {function} {loadingSpeedFactor} Adjust speed of the percentage progress
 * @param {function} {STATUS_CONSTANTS} Status constants. Should contain the following values : LOADING, DOWNLOADING.
 */
const ReportsCircularProgress = ({
  status,
  creationDate,
  loadingSpeedFactor,
  STATUS_CONSTANTS: { LOADING, DOWNLOADING },
}) => {
  const mountRef = useRef(true);
  const [progress, setProgress] = useState(
    status === DOWNLOADING
      ? 0
      : Math.floor(
          (new Date().getTime() - new Date(creationDate).getTime()) / 1000
        ) * 10
  );
  const classes = usePercentageStyles();
  const percentageIncrement = status === LOADING ? 1 : 2;

  const speedFactor = (prevProgress) => {
    const speedFactor = loadingSpeedFactor ?? 1;
    if (prevProgress > 70 && prevProgress < 90) return speedFactor / 2;
    else if (prevProgress >= 90 && prevProgress < 98) return speedFactor / 4;
    return speedFactor;
  };

  useEffect(() => {
    if (mountRef.current) {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 98
            ? 99
            : prevProgress + percentageIncrement * speedFactor(prevProgress)
        );
      }, 100);
      return () => {
        clearInterval(timer);
        mountRef.current = false;
      };
    }
  }, []);

  return (
    <>
      <CircularProgress
        status={status}
        value={progress}
        size={30}
        variant="determinate"
        color="secondary"
      />
      <div className={classes.percentageValue}>{`${Math.round(
        progress
      )}%`}</div>
    </>
  );
};

export default ReportsCircularProgress;
