import React, { useEffect, useState, useRef } from "react";
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
    },
    timerLabelChip: {
        padding: "0px 12px !important"
    }
}));

const MinutesTimer = ({ label = "", reset = false, resetCallback = null, timeInterval = 1800 }) => {
    let timerId = useRef();
    const [time, setTime] = useState(0);
    const [runTimer, setRunTimer] = useState(false);
    const RESET_INTERVAL_S = timeInterval;
    const timeRemain = runTimer ? RESET_INTERVAL_S - (time % RESET_INTERVAL_S) : 0;
    const { timerRoot, counter, timerLabel, timerLabelChip } = timerStyles()
    const formatTime = (time) => {
        const timeRemainder = (isNaN(time) ? 0 : time)
        return `${String(Math.floor(timeRemainder / 60)).padStart(2, "0")}:${String(
            timeRemainder % 60
        ).padStart(2, "0")}`;
    }

    useEffect(() => {
        setRunTimer(true);
    }, []);

    useEffect(() => {
        if (runTimer) {
            timerId.current = setInterval(() => {
                setTime((t) => t + 1);
            }, 1000);
        }
        else {
            if (timerId.current) {
                clearInterval(timerId.current)
            }
        }
    }, [runTimer]);

    useEffect(() => {
        if (time === RESET_INTERVAL_S) {
            setRunTimer(false);
            setTime(0)
            resetCallback && resetCallback()
        }
    }, [time]);

    useEffect(() => {
        if (reset) {
            setTime(0)
            setRunTimer(true);
        }
    }, [reset]);

    return (
        <Chip
            classes={{
                root: timerRoot,
                label: timerLabelChip
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