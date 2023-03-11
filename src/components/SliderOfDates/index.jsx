import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Tooltip from '../Tooltips';
import Button from '@material-ui/core/Button';
import propTypes from './props';
RangeSlider.propTypes = propTypes;

const useStyles = makeStyles({
    root: {
        width: '80%',
        margin: '50px',
    },
});

const TooltipLight = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 20,
    },
}))(Tooltip);

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        border: '5px solid #5CADEA',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 6,
        color: '#5CADEA',
        borderRadius: 4,
    },
    rail: {
        height: 6,

        color: '#EDF1F8',
        borderRadius: 4,
    },
})(Slider);

export default function RangeSlider(props) {
    const { min, max, currentMin, currentMax, onChange } = props;

    const TYPE_MONTH = 'month';
    const TYPE_YEAR = 'year';

    const classes = useStyles();

    const minYear = min.getFullYear();
    const maxYear = max.getFullYear();
    const minMonth = min.getMonth();
    const maxMonth = max.getMonth();
    const minMaxMonth = getMonthFromMS(max - min);
    console.log(minMonth, maxMonth);

    function getMonthFromMS(ms) {
        return Math.floor(ms / (30 * 24 * 60 * 60 * 1000));
    }

    function getNumberFromDate(date) {
        let dateMonth = date.getMonth();
        let dateYear = date.getFullYear();
        let result = (dateYear - minYear) * 12 + dateMonth; //число месяцев до + число месяцев после
        return result;
    }

    function getDateFromNumber(num) {
        let dateYear = getYear(num);
        let dateMonth = getMonth(num); //индекс месяца
        let result = new Date(dateYear, dateMonth);
        return result;
    }

    function getYear(num) {
        let dateYear = minYear + Math.floor(num / 12);
        return dateYear;
    }

    function getMonth(num) {
        if (num < 12) {
            return num;
        } else {
            return num % 12; //0-11
        }
    }

    function getShortStrMonth(month) {
        return month.slice(0, 3);
    }

    function valuetext(value) {
        const year = getYear(value);
        const month = getMonth(value);
        const monthStr = months[month];

        return `${monthStr} ${year}`;
    }

    const months = [
        'январь',
        'февраль',
        'март',
        'апрель',
        'май',
        'июнь',
        'июль',
        'август',
        'сентябрь',
        'октябрь',
        'ноябрь',
        'декабрь',
    ];

    const [value, setValue] = useState([
        getNumberFromDate(currentMin),
        getNumberFromDate(currentMax),
    ]);

    const [marks, setMarks] = useState(getMarksMonth());

    const [typeSlider, setTypeSlider] = useState(TYPE_MONTH);
    //let marks = getMarks();

    function getMarksMonth() {
        let newMarksArr = [];
        for (let date = minMonth; date <= minMaxMonth; date++) {
            let monthNum = getMonth(date);
            if (date === minMonth || getMonth(date) === 0) {
                //date === minMonth || getMonth(date) === 0
                const year = getYear(date);
                newMarksArr.push({
                    value: date,
                    label: year.toString(),
                });
            } else {
                const month = getMonth(date);
                const monthStr = getShortStrMonth(months[month]);
                newMarksArr.push({
                    value: date,
                    label: monthStr,
                });
            }
        }

        return newMarksArr;
    }

    function getMarksYear() {
        let newMarksArr = [];
        for (let date = minMonth; date <= minMaxMonth; date++) {
            let monthNum = getMonth(date);
            if (date === minMonth || getMonth(date) === 0) {
                //date === minMonth || getMonth(date) === 0
                const year = getYear(date);
                newMarksArr.push({
                    value: date,
                    label: year.toString(),
                });
            }
        }
        return newMarksArr;
    }

    //useEffect(getMarks, [min, max]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const valueDate = [
            getDateFromNumber(value[0]),
            getDateFromNumber(value[1]),
        ];
        onChange(valueDate);
    };

    const handleClickYear = () => {
        setTypeSlider(TYPE_YEAR);
        setMarks(getMarksYear());
    };
    const handleClickMonth = () => {
        setTypeSlider(TYPE_MONTH);
        setMarks(getMarksMonth());
    };

    return (
        <>
            <Button onClick={handleClickYear}>Все года</Button>
            <Button onClick={handleClickMonth}>Месяца</Button>

            <div className={classes.root}>
                <Typography id="range-slider" gutterBottom>
                    Date range
                </Typography>
                <PrettoSlider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    ValueLabelComponent={TooltipLight}
                    aria-labelledby="custom thumb label"
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    min={minMonth}
                    step={1}
                    max={minMaxMonth}
                    marks={marks}
                />
            </div>
        </>
    );
}
