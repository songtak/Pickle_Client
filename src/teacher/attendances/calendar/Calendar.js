import React, {useState, useRef} from 'react'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {Calendar, utils} from 'react-modern-calendar-datepicker';
import '../attendanceMain.css';
export const ACalendar = () => {
    const [selectedDay, setSelectedDay] = useState(utils().getToday());
    const minimumDate = {year: 2018, month: 2, day: 20};
    const maximumDate = {year: 2021, month: 1, day: 30}
    const javaDate = `${(selectedDay.year).toString()}-${selectedDay.month.toString()}-${(selectedDay.day.toString())}`
    const renderCustomInput = ({ ref }) => (
        <input
            readOnly
            ref={ref}
            placeholder="Select a Day"
            value ={`${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`}
            style={{
                textAlign: 'center',
                padding: '0.3rem 0.5rem',
                fontSize: 'medium',
                border: '1px solid #184f90',
                borderRadius: '50px',
                boxShadow: '0 0.5rem 1rem rgba(156, 136, 255, 0.2)',
                color: '#184f90',
                outline: 'none',
                margin : '0.3rem'
            }}
            className="my-custom-input-class"
            onChange = {
                e=>{setSelectedDay(e.target.value)
                }}
        />
    )
    const renderCalendarInput = ({ ref }) => (
        <input
            ref={ref}
            value ={`${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`}
            style={{
                width : '100%',
                height : '100%',
            }}
            className="my-custom-input-class"
        />
    )
    const dateRef = useRef()
    return (
        <>
            <div>
                <Calendar
                    value={selectedDay}
                    onChange={setSelectedDay}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    colorPrimary="#00365a"
                    calendarClassName="custom-calendar"
                    shouldHighlightWeekends
                />
            </div>
        </>
    )
}
export default ACalendar;