import React, { useState, useEffect } from 'react';
import './App.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.css'; // core css
import 'primeicons/primeicons.css'; // icons
//components
import SliderOfDates from './components/SliderOfDates';
import Alert from './components/Alerts';
import Demo from './components/Calendars';

function App() {
    const [typeSlider, setTypeSlider] = useState('month');
    const [currentDates, setCurrentDates] = useState([
        'Sun Jun 01 2014 00:00:00 GMT+0700 (GMT+07:00)',
        1409504400000,
    ]);

    const [minMax, setMinMax] = useState([
        new Date(2014, 0),
        new Date(2016, 5),
    ]);

    const [disabled, setDisabled] = useState(false);

    function callErrorDisabled(message) {
        setDisabled(true);
    }

    function isDateFormat(date) {
        const checkedDate = new Date(date);

        return (
            checkedDate &&
            Object.prototype.toString.call(checkedDate) === '[object Date]' &&
            !isNaN(checkedDate)
        );
    }

    function checkProps(dates) {
        //проверка, что данные возможно преобразовать к дате
        if (!isDateFormat(dates[0]) || !isDateFormat(dates[1])) {
            callErrorDisabled();
            return;
        }
        //проверка, что минимальное не больше максимального
        if (new Date(dates[0]) > new Date(dates[1])) {
            callErrorDisabled();
            return;
        }
    }

    function setCurrentInMinMax() {
        //если текущие даты вне максильной и/или минимальной
        let change = false;
        let newCurrent = [...currentDates];
        if (
            new Date(currentDates[0]) < new Date(minMax[0]) ||
            new Date(currentDates[0]) > new Date(minMax[1])
        ) {
            newCurrent[0] = minMax[0];
            change = true;
        }
        if (
            new Date(currentDates[1]) < new Date(minMax[0]) ||
            new Date(currentDates[1]) > new Date(minMax[1])
        ) {
            newCurrent[1] = minMax[1];
            change = true;
        }
        if (change) {
            setCurrentDates(newCurrent);
        }
    }

    useEffect(() => {
        checkProps(currentDates);
    }, [currentDates]);

    useEffect(() => {
        checkProps(minMax);
        setCurrentInMinMax();
    }, [minMax]);

    return (
        <div className="App">
            {disabled ? (
                <Alert>
                    Некорректные входные данные! Обратитесь в поддержку.
                </Alert>
            ) : (
                <>
                    <div className="datesContainer">
                        <label htmlFor="calendar" className="label">
                            Текущие даты:
                            <Demo
                                key={currentDates.toString()}
                                value={currentDates}
                                onChange={(val) => {
                                    setCurrentDates(val);
                                }}
                                minDate={minMax[0]}
                                maxDate={minMax[1]}
                            />
                        </label>

                        <label className="label" htmlFor="calendar">
                            Минимальная и максимальная даты:
                            <Demo
                                key={minMax.toString()}
                                value={minMax}
                                onChange={(val) => setMinMax(val)}
                            />
                        </label>
                    </div>
                    <SliderOfDates
                        className="slider"
                        key={
                            currentDates.toString() +
                            minMax.toString() +
                            typeSlider
                        }
                        min={minMax[0]}
                        max={minMax[1]}
                        currentMin={currentDates[0]}
                        currentMax={currentDates[1]}
                        typeSlider={typeSlider}
                        onChangeType={(val) => {
                            setTypeSlider(val);
                        }}
                        onChange={(val) => setCurrentDates(val)}
                    />
                </>
            )}
        </div>
    );
}

export default App;
