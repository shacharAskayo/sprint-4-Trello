import React, { useState } from "react";
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export function AddDueDateModal(props) {

    const [date, setStartDate] = useState(new Date())
    const { card, save, closeModal } = props

    function saveDate(dueDate) {
        const msg = dueDate ? `Set the due-date to ${dueDate.toLocaleDateString()}` : `Removed the due-date`
        save({ ...card, dueDate }, msg)
        closeModal()
    }

    return (
        <div className="due-date-modal card-action-modal">
            <div className="flex justify-center">
                Members
                </div>
            <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
            <hr />
            <DatePicker
                selected={date}
                inline
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                yearDropdownItemNumber={20}
                dateFormatCalendar="MMMM"
                scrollableYearDropdown
                dropdownMode="select"
                onChange={date => setStartDate(date)} />

            <div className="due-date-bouttons flex space-bt">
                <button onClick={() => saveDate(date)}>Save</button>
                <button onClick={() => saveDate(null)}>Remove</button>
            </div>

        </div>
    );
};
