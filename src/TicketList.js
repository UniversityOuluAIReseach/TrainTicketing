import React, { useEffect, useState } from 'react';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/tickets')
      .then(response => response.json())
      .then(data => {
        setTickets(data);
      })
      .catch(error => {
        console.error('Error retrieving tickets:', error);
      });
  }, []);

  return (
    <div>
      <h2>Ticket List</h2>
      <table>
        <thead>
          <tr>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Passenger Name</th>
            <th>Train Number</th>
            <th>Source Station</th>
            <th>Destination Station</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.ticketId}>
              <td>{ticket.departureTime}</td>
              <td>{ticket.arrivalTime}</td>
              <td>{ticket.passenger.passengerName}</td>
              <td>{ticket.train.trainNumber}</td>
              <td>{ticket.train.sourceStation}</td>
              <td>{ticket.train.destinationStation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
