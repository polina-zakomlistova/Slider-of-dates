import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '../Tooltips';
import Button from '@material-ui/core/Button';
import propTypes from './props';
RangeSlider.propTypes = propTypes;

const useStyles = makeStyles({
    root: {
        margin: '50px 0',
        padding: '10px',
        display: 'flex',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 120px 0 0',
    },
    slider: {
        margin: '50px 0',
        flexGrow: 1,
    },

    button: {
        color: '#0167B3',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '18px',
        textTransform: 'none',
    },
});

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        width: '90%',
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
        left: 'calc(-50% + 0px)',
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
    mark: {
        backgroundColor: 'transparent',
    },

    markLabel: {
        color: '#999999',
        textTransform: 'lowercase',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '18px',
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
    const countMarkes = (maxYear - minYear) * 12 - minMonth + (maxMonth + 1); //число маркеров между минимаьной и максимальной датой
    const numMaxMonth = countMarkes + minMonth - 1;

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

        return `${monthStr}
        
        ${year}`;
    }

    const months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];
    function getMarks() {
        if (typeSlider === TYPE_MONTH) {
            return getMarksMonth();
        } else {
            return getMarksYear();
        }
    }

    function getMarksMonth() {
        let newMarksArr = [];
        for (let date = minMonth; date < numMaxMonth; date++) {
            let monthNum = getMonth(date);
            if (date === minMonth || monthNum === 0) {
                const year = getYear(date);
                newMarksArr.push({
                    value: date,
                    label: year.toString(),
                });
            } else {
                const month = monthNum;
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
        for (let date = minMonth; date < numMaxMonth; date++) {
            let monthNum = getMonth(date);
            if (date === minMonth || monthNum === 0) {
                const year = getYear(date);
                newMarksArr.push({
                    value: date,
                    label: year.toString(),
                });
            }
        }
        return newMarksArr;
    }

    const [value, setValue] = useState([
        getNumberFromDate(currentMin),
        getNumberFromDate(currentMax),
    ]);

    const [marks, setMarks] = useState(getMarksMonth());

    const [typeSlider, setTypeSlider] = useState(TYPE_MONTH);

    //useEffect(getMarks, [min, max]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const valueDate = [
            getDateFromNumber(newValue[0]),
            getDateFromNumber(newValue[1]),
        ];
        onChange(valueDate);
    };

    useEffect(() => setMarks(getMarks()), [typeSlider]);

    return (
        <>
            <div className={classes.root}>
                <div className={classes.buttons}>
                    <Button
                        className={classes.button}
                        onClick={() => setTypeSlider(TYPE_YEAR)}
                    >
                        Все года
                    </Button>
                    <Button
                        className={classes.button}
                        onClick={() => setTypeSlider(TYPE_MONTH)}
                    >
                        Месяца
                    </Button>
                </div>

                <div className={classes.slider}>
                    <PrettoSlider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        ValueLabelComponent={Tooltip}
                        aria-labelledby="custom thumb label"
                        valueLabelFormat={valuetext}
                        min={minMonth}
                        step={1}
                        max={numMaxMonth}
                        marks={marks}
                    />
                </div>
            </div>
        </>
    );
}
