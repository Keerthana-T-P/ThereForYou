import React, { useState } from 'react';
import Therapists from './components/Therapists';
import Timeslots from './components/Timeslots';
import BookAppointment from './components/BookAppointment';

const App = () => {
    const [selectedTherapist, setSelectedTherapist] = useState(null);

    return (
        <div>
            <Therapists setTherapist={setSelectedTherapist} />
            {selectedTherapist && <Timeslots therapist={selectedTherapist} />}
            {selectedTherapist && <BookAppointment therapist={selectedTherapist} />}
        </div>
    );
};

export default App;
