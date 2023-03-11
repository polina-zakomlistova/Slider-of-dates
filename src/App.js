import React, { useState } from 'react';
import './App.css';

import SliderOfDates from './components/SliderOfDates';

function App() {
    const [currentDates, setCurrentDates] = useState([
        new Date(2014, 6),
        new Date(2015, 8),
    ]);
    const [minMax, setMinMax] = useState([
        new Date(2014, 1),
        new Date(2017, 1),
    ]);

    return (
        <div className="App">
            <div>{currentDates.toString()}</div>

            <input
                type="date"
                value={minMax[0]}
                onChange={(e) =>
                    setCurrentDates([new Date(e.target.value), currentDates[1]])
                }
            ></input>

            <SliderOfDates
                min={minMax[0]}
                max={minMax[1]}
                currentMin={currentDates[0]}
                currentMax={currentDates[1]}
                onChange={(val) => setCurrentDates(val)}
            />
        </div>
    );
}

export default App;
