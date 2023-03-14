import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';

export default function RangeCalendar(props) {
    const { value, onChange, minDate, maxDate } = props;

    function getDateFormat(date) {
        return new Date(date);
    }

    const min = getDateFormat(minDate);
    const max = getDateFormat(maxDate);

    const valueDates = [getDateFormat(value[0]), getDateFormat(value[1])];

    const [selectedDates, setSelectedDates] = useState([]);

    const handleChange = (e) => {
        const dates = e.value;
        // Проверяем, выбраны ли оба элемента массива
        if (selectedDates[0] && !selectedDates[1]) {
            const newDates = validDatesRange([selectedDates[0], dates[0]]);
            onChange(newDates);
            setSelectedDates([]);
        } else {
            setSelectedDates(dates);
        }
    };

    function validDatesRange(dates) {
        return dates.sort((date1, date2) => date1 - date2);
    }

    return (
        <div className="card flex justify-content-center">
            <Calendar
                value={valueDates}
                dateFormat="mm/yy"
                onChange={handleChange}
                selectionMode="range"
                readOnlyInput
                minDate={min}
                maxDate={max}
                view="month"
            />
        </div>
    );
}
