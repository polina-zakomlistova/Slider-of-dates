import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';

export default function RangeCalendar(props) {
    const { value, onChange, minDate, maxDate } = props;

    const [selectedDates, setSelectedDates] = useState([]);

    const handleChange = (e) => {
        const dates = e.value;
        console.log(dates);
        console.log(selectedDates);
        // Проверяем, выбраны ли оба элемента массива
        if (selectedDates && selectedDates[0] && selectedDates[1]) {
            onChange(selectedDates);
            setSelectedDates([]);
        } else if (selectedDates[0] && !selectedDates[1]) {
            onChange([selectedDates[0], dates[0]]);
            setSelectedDates([]);
        } else {
            setSelectedDates(dates);
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Calendar
                value={value}
                dateFormat="mm/yy"
                onChange={handleChange}
                selectionMode="range"
                readOnlyInput
                minDate={minDate}
                maxDate={maxDate}
            />
        </div>
    );
}
