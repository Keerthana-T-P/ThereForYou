import React, { useState } from 'react';
import axios from 'axios';

const BookAppointment = ({ therapist }) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');

    const bookAppointment = () => {
        axios.post('/book', {
            calendar_id: therapist.calendar_id,
            start_time: startTime,
            end_time: endTime,
            summary: summary,
            description: description
        })
        .then(response => {
            alert('Appointment booked successfully!');
        })
        .catch(error => {
            console.error("There was an error booking the appointment!", error);
        });
    };

    return (
        <div>
            <h2>Book an Appointment</h2>
            <input type="datetime-local" onChange={(e) => setStartTime(e.target.value)} />
            <input type="datetime-local" onChange={(e) => setEndTime(e.target.value)} />
            <input type="text" placeholder="Summary" onChange={(e) => setSummary(e.target.value)} />
            <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <button onClick={bookAppointment}>Book Appointment</button>
        </div>
    );
};

export default BookAppointment;
