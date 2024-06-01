import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Therapists = ({ setTherapist }) => {
    const [therapists, setTherapists] = useState([]);

    useEffect(() => {
        axios.get('/therapists')
            .then(response => {
                setTherapists(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the therapists!", error);
            });
    }, []);

    return (
        <div>
            <h2>Select a Therapist</h2>
            <ul>
                {therapists.map(therapist => (
                    <li key={therapist.id} onClick={() => setTherapist(therapist)}>
                        {therapist.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Therapists;
