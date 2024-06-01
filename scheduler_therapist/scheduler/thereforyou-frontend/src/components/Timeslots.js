import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Timeslots = ({ therapist }) => {
    const [timeslots, setTimeslots] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        if (therapist && startTime && endTime) {
            axios.get('/timeslots', {
                params: {
                    calendar_id: therapist.calendar_id,
                    start_time: startTime,
                    end_time: endTime
                }
            })
            .then(response => {
                setTimeslots(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the timeslots!", error);
            });
        }
    }, [therapist, startTime, endTime]);

    return (
        <div>
            <h2>Available Timeslots</h2>
            <input type="datetime-local" onChange={(e) => setStartTime(e.target.value)} />
            <input type="datetime-local" onChange={(e) => setEndTime(e.target.value)} />
            <ul>
                {timeslots.map((timeslot, index) => (
                    <li key={index}>
                        {timeslot.start} - {timeslot.end}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Timeslots;
