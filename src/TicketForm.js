import React, { useState } from 'react';

const TicketForm = () => {
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [passengerName, setPassengerName] = useState('');
  const [trainNumber, setTrainNumber] = useState('');
  const [sourceStation, setSourceStation] = useState('');
  const [destinationStation, setDestinationStation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const passengerData = {
        passengerName: passengerName
      };
      
      fetch('http://localhost:8080/passengers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passengerData)
      })
        .then(response => response.json())
        .then(passenger => {
          // Create Train
          const trainData = {
            trainNumber: trainNumber,
            sourceStation: sourceStation,
            destinationStation: destinationStation
          };
      
          fetch('http://localhost:8080/trains', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainData)
          })
            .then(response => response.json())
            .then(train => {
              // Create Ticket
              const ticketData = {
                ticketId: 10,
                passenger: {
                  passengerId: passenger.passengerId,
                  passengerName: passenger.passengerName
                },
                train: {
                  trainNumber: train.trainNumber,
                  sourceStation: train.sourceStation,
                  destinationStation: train.destinationStation
                },
                departureTime: departureTime,
                arrivalTime: arrivalTime
              };
      
              fetch('http://localhost:8080/tickets', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(ticketData)
              })
                .then(response => response.json())
                .then(data => {
                  console.log('Ticket created:', data);
                  // Reset form fields
                  setDepartureTime('');
                  setArrivalTime('');
                  setPassengerName('');
                  setTrainNumber('');
                  setSourceStation('');
                  setDestinationStation('');
                })
                .catch(error => {
                  console.error('Error creating ticket:', error);
                });
            })
            .catch(error => {
              console.error('Error creating train:', error);
            });
        })
        .catch(error => {
          console.error('Error creating passenger:', error);
        });
  };

  return (
    <div>
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Departure Time:
          <input type="datetime-local" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />
        </label>
        <br />
        <label>
          Arrival Time:
          <input type="datetime-local" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} required />
        </label>
        <br />
        <label>
          Passenger Name:
          <input type="text" value={passengerName} onChange={(e) => setPassengerName(e.target.value)} required />
        </label>
        <br />
        <label>
          Train Number:
          <input type="text" value={trainNumber} onChange={(e) => setTrainNumber(e.target.value)} required />
        </label>
        <br />
        <label>
          Source Station:
          <input type="text" value={sourceStation} onChange={(e) => setSourceStation(e.target.value)} required />
        </label>
        <br />
        <label>
          Destination Station:
          <input type="text" value={destinationStation} onChange={(e) => setDestinationStation(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default TicketForm;
