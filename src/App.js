
import React, { useState, useEffect } from 'react';
import './App.css';
const eventData = [
  {"Event":"Inauguaral Event",
    "Date":"22/09/2023",
    "startTime":"10:30",
    "endTime":"11:30"
    },
    {"Event":"Flutter Seminar",
    "Date":"22/09/2023",
    "startTime":"11:30",
    "endTime":"12:30"
    },
    {
    "Event":"CodeBrains",
    "Date":"22/09/2023",
    "startTime": "12:30",
    "endTime":"14:00"
    },
    {
    "Event":"Rubiks",
    "Date":"22/09/2023",
    "startTime": "14:00",
    "endTime":"15:00"
    },
    {
    "Event":"Frontend Seminar",
    "Date":"22/09/2023",
    "startTime": "15:00",
    "endTime":"16:00"
    },
    {
    "Event":"Workshop",
    "Date":"22/09/2023",
    "startTime": "16:00",
    "endTime":"17:30"
    },
    {
    "Event":"Gaming Competition (Qualification)",
    "Date":"22/09/2023",
    "startTime": "11:30",
    "endTime":"17:00"
    },
    {
    "Event":"Gaming Dev Seminar",
    "Date":"23/09/2023",
    "startTime": "11:00",
    "endTime":"12:30"
    },
    {
    "Event":"Guest Lecture",
    "Date":"23/09/2023",
    "startTime": "12:30",
    "endTime":"14:00"
    },
    {
    "Event":"ML Seminar",
    "Date":"23/09/2023",
    "startTime": "14:00",
    "endTime":"15:00"
    },
    {
    "Event":"Debate",
    "Date":"23/09/2023",
    "startTime": "15:00",
    "endTime":"16:30"
    },
    {
    "Event":"Power Puzzle Sudoku",
    "Date":"23/09/2023",
    "startTime": "16:30",
    "endTime":"17:30"
    },
    {
    "Event":"CTF HACKATHON",
    "Date":"23/09/2023",
    "startTime": "10:30",
    "endTime":"17:30"
    },
    {
    "Event":"SNAP BUZZ",
    "Date":"23/09/2023",
    "startTime": "14:00",
    "endTime":"17:30"
    },
    {
    "Event":"Backend Seminar",
    "Date":"24/09/2023",
    "startTime": "11:00",
    "endTime":"12:30"
    },
    {
    "Event":"Binary Exploitation",
    "Date":"24/09/2023",
    "startTime": "12:30",
    "endTime":"14:00"
    },
    {
    "Event":"Gen Quiz",
    "Date":"24/09/2023",
    "startTime": "14:30",
    "endTime":"15:30"
    },
    {
    "Event":"Tech Quiz",
    "Date":"24/09/2023",
    "startTime": "15:30",
    "endTime":"16:30"
    },
    {
    "Event":"Prize Announcement",
    "Date":"24/09/2023",
    "startTime": "16:30",
    "endTime":"17:30"
    },
    {
    "Event":"Short Film",
    "Date":"24/09/2023",
    "startTime": "10:30",
    "endTime":"12:30"
    },
    {
    "Event":"Reel Making",
    "Date":"24/09/2023",
    "startTime": "12:30",
    "endTime":"14:30"
    },
    {
    "Event":"Gaming Event (Final up round)",
    "Date":"24/09/2023",
    "startTime": "11:30",
    "endTime":"17:00"
    },
    {
    "Event":"DJ Night",
    "Date":"24/09/2023",
    "startTime": "17:30",
    "endTime":"19:30"
    }
];


function App() {
  const [events, setEvents] = useState(eventData);
  const [editMode, setEditMode] = useState(false);
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [eventIndexToEdit, setEventIndexToEdit] = useState(null);

  const timeSlots = [];
  const startTime = new Date('2023-09-22T10:30:00');
  const endTime = new Date('2023-09-22T19:30:00');

  
  let currentTime = new Date(startTime);
  while (currentTime <= endTime) {
    timeSlots.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  
  const toggleEditMode = (eventIndex) => {
    setEditMode(!editMode);
    setEventIndexToEdit(eventIndex);
    setNewStartTime('');
    setNewEndTime('');
  };

  
  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  
  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  
  const updateEventTimes = () => {
    const eventIndex = eventIndexToEdit;
    if (eventIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[eventIndex].startTime = newStartTime;
      updatedEvents[eventIndex].endTime = newEndTime;

      
      const eventStartTime = new Date(`2023-09-22T${newStartTime}`);
      const eventEndTime = new Date(`2023-09-22T${newEndTime}`);

      updatedEvents[eventIndex].startTimeIndex = Math.floor(
        (eventStartTime - startTime) / (30 * 60 * 1000)
      );
      updatedEvents[eventIndex].endTimeIndex = Math.ceil(
        (eventEndTime - startTime) / (30 * 60 * 1000)
      );

      setEvents(updatedEvents);
      toggleEditMode(null);
      closePasswordModal();
    }
  };

  useEffect(() => {
    
    if (!editMode) {
      
      const updatedEvents = [...events];
      updatedEvents.forEach((event) => {
        const eventStartTime = new Date(`2023-09-22T${event.startTime}`);
        const eventEndTime = new Date(`2023-09-22T${event.endTime}`);
        event.startTimeIndex = Math.floor(
          (eventStartTime - startTime) / (30 * 60 * 1000)
        );
        event.endTimeIndex = Math.ceil(
          (eventEndTime - startTime) / (30 * 60 * 1000)
        );
      });
      setEvents(updatedEvents);
    }
  }, [editMode, events, startTime]);

  const handlePasswordSubmit = () => {
    
    if (password === 'password123') {
      updateEventTimes();
      setPassword('');
    } else {
      alert('Incorrect password. Please try again.');
      setPassword('');
      closePasswordModal();
    }
  };
  const cancelEdit = () => {
    toggleEditMode(null);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold my-4 bg-white">Event Scheduler</h1>
      <div className="table-container w-100%">
      <table className="table-auto">
        <thead className="bg-white sticky top-0">
          <tr>
            <th className="p-2 border border-black">Event Name</th>
            {timeSlots.map((timeSlot, index) => (
              <th key={index} className="p-2 border border-black ">
                {timeSlot}
              </th>
            ))}
            <th className="p-2 border border-black">Edit</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, eventIndex) => (
            <tr key={eventIndex} className='border-t-4 border-white-400'>
              <td className="p-2 border border-black">{event.Event}</td>
              {timeSlots.map((_, timeIndex) => {
                const isEventActive =
                timeIndex >= event.startTimeIndex &&
                timeIndex < event.endTimeIndex + 1;
                return (
                  <td
                  key={timeIndex}
                  className={`p-2 border border-black ${
                    isEventActive ? 'bg-blue-400' : ''
                  }`}
                  ></td>
                  );
                })}
              <td className="p-2 border border-black">
                {editMode && eventIndex === eventIndexToEdit ? (
                  <div>
                    <input
                      type="text"
                      placeholder="New Start Time"
                      value={newStartTime}
                      onChange={(e) => setNewStartTime(e.target.value)}
                      className="p-2 border border-black mr-2 mb-4"
                      />
                    <input
                      type="text"
                      placeholder="New End Time"
                      value={newEndTime}
                      onChange={(e) => setNewEndTime(e.target.value)}
                      className="p-2 border border-black mr-2 mb-4"
                      />
                    <button
                      onClick={openPasswordModal}
                      className="p-2 bg-green-400 text-white hover:bg-green-600 mr-2 rounded-lg"
                      >
                      Save
                    </button>
                    <button
            onClick={cancelEdit}
            className="p-2 bg-red-400 text-white hover:bg-red-600 rounded-lg"
          >
            Cancel
          </button>
                  </div>
                ) : (
                  <button
                  onClick={() => toggleEditMode(eventIndex)}
                  className="p-2 bg-blue-400 text-white hover:bg-blue-600 mr-2 rounded-lg"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Enter Password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-black mb-2"
            />
            <button
              onClick={handlePasswordSubmit}
              className="p-2 bg-green-400 text-white hover:bg-green-600 mr-2 ml-2 rounded-lg"
            >
              Submit
            </button>
            <button
              onClick={closePasswordModal}
              className="p-2 bg-red-400 text-white hover:bg-red-600 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;