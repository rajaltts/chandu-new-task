import React, { useEffect, useState } from "react";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const timerStyles = makeStyles((theme) => ({
    timerLabel: {
        color: "white"
    },
    counter: {
        color: "#1891F6"
    },
    timerRoot: {
        background: "rgba(0, 0, 0, 0.3)"
    }
}));

const MinutesTimer = ({ label = "", reset = false, resetCallback = null, timeInterval = 1800 }) => {
    const [time, setTime] = useState(0);
    const RESET_INTERVAL_S = timeInterval;
    const timeRemain = RESET_INTERVAL_S - (time % RESET_INTERVAL_S);
    const { timerRoot, counter, timerLabel } = timerStyles()
    const formatTime = (time) =>
        `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
            time % 60
        ).padStart(2, "0")}`;

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime((t) => t + 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        if ((time === RESET_INTERVAL_S) && resetCallback) {
            resetCallback()
        }
    }, [time]);

    useEffect(() => {
        if (reset && (time === RESET_INTERVAL_S)) {
            setTime(0)
        }
    }, [reset]);

    return (
        <Chip
            classes={{
                root: timerRoot
            }}
            size="small"
            label={
                <>
                    <span className={timerLabel}>{label}</span>
                    <span className={counter}> {formatTime(timeRemain)}</span>
                </>
            }
        />
    );
};

export default MinutesTimer;