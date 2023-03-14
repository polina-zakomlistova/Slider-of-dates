import React, { useState } from 'react';
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
        alignItems: 'center',
        '@media(max-width: 769px)': {
            flexDirection: 'column',
        },
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 120px 0 0',

        '@media(max-width: 1439px)': {
            display: 'none',
        },
    },
    slider: {
        margin: '50px 0',
        flexGrow: 1,
        '@media(max-width: 769px)': {
            width: '90%',
        },
    },

    button: {
        color: '#0167B3',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '18px',
        textTransform: 'none',
        '@media(max-width: 769px)': {
            fontSize: '12px',
            lineHeight: '16px',
        },
        '@media(max-width: 376px)': {
            fontSize: '10px',
            lineHeight: '14px',
        },
    },

    yearMark: {
        color: '#333333',
    },

    monthMark: {
        '@media(max-width: 1439px)': {
            display: 'none',
        },
    },

    displayNone: { display: 'none' },
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
        '@media(max-width: 769px)': {
            fontSize: '12px',
            lineHeight: '16px',
        },
        '@media(max-width: 376px)': {
            fontSize: '10px',
            lineHeight: '14px',
        },
    },
})(Slider);

export default function RangeSlider(props) {
    const {
        min,
        max,
        currentMin = min,
        currentMax = max,
        onChange,
        typeSlider,
        onChangeType,
    } = props;

    const classes = useStyles();
    const TYPE_MONTH = 'month';
    const TYPE_YEAR = 'year';

    function getDateFormat(date) {
        return new Date(date);
    }

    //формат к дате
    const minDate = getDateFormat(min);
    const maxDate = getDateFormat(max);
    const currentMinDate = getDateFormat(currentMin);
    const currentMaxDate = getDateFormat(currentMax);

    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();
    const minMonth = minDate.getMonth();
    const maxMonth = maxDate.getMonth();
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

        return `${monthStr} ${year}`;
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

    let classesMonthLable = `${classes.monthMark} ${
        typeSlider === TYPE_YEAR ? classes.displayNone : ''
    }`;

    const getMarkLabel = (isMonth, value) => {
        if (isMonth) {
            return <span className={classesMonthLable}>{value}</span>;
        } else {
            return <span className={classes.yearMark}>{value}</span>;
        }
    };
    function getMarks() {
        let newMarksArr = [];
        for (let date = minMonth; date <= numMaxMonth; date++) {
            let monthNum = getMonth(date);
            if (date === minMonth || monthNum === 0) {
                const year = getYear(date);
                newMarksArr.push({
                    value: date,
                    label: getMarkLabel(false, year.toString()),
                });
            } else {
                const month = monthNum;
                const monthStr = getShortStrMonth(months[month]);
                newMarksArr.push({
                    value: date,
                    label: getMarkLabel(true, monthStr),
                });
            }
        }

        return newMarksArr;
    }

    const [marks, setMarks] = useState(getMarks());

    if (countMarkes > 30) {
        onChangeType(TYPE_YEAR);
    }

    const [value, setValue] = useState([
        getNumberFromDate(currentMinDate),
        getNumberFromDate(currentMaxDate),
    ]);

    const handleChangeCommitted = (event, newValue) => {
        setValue(newValue);
        const valueDate = [
            getDateFromNumber(newValue[0]),
            getDateFromNumber(newValue[1]),
        ];
        onChange(valueDate);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className={classes.root}>
                {!(countMarkes > 30) ? (
                    <div className={classes.buttons}>
                        <Button
                            className={classes.button}
                            onClick={() => onChangeType(TYPE_YEAR)}
                        >
                            Все года
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={() => onChangeType(TYPE_MONTH)}
                        >
                            Месяца
                        </Button>
                    </div>
                ) : (
                    <></>
                )}

                <div className={classes.slider}>
                    <PrettoSlider
                        value={value}
                        onChange={handleChange}
                        onChangeCommitted={handleChangeCommitted}
                        valueLabelDisplay="on"
                        aria-labelledby="discrete-slider-always"
                        ValueLabelComponent={Tooltip}
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
