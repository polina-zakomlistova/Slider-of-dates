import React, { useState, useEffect } from 'react';
import './App.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.css'; // core css
import 'primeicons/primeicons.css'; // icons

import SliderOfDates from './components/SliderOfDates';
import Demo from './components/Calendars';

function App() {
    const [typeSlider, setTypeSlider] = useState('month');
    const [currentDates, setCurrentDates] = useState([
        new Date(2014, 5),
        new Date(2015, 8),
    ]);

    const [minMax, setMinMax] = useState([
        new Date(2014, 0),
        new Date(2016, 11),
    ]);

    return (
        <div className="App">
            {
                <div className="datesContainer">
                    <label htmlFor="calendar" className="label">
                        Текущие даты:
                        <Demo
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
                            value={minMax}
                            onChange={(val) => setMinMax(val)}
                        />
                    </label>
                </div>
            }

            <SliderOfDates
                className="slider"
                key={currentDates.toString() + minMax.toString() + typeSlider}
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
        </div>
    );
}

export default App;
