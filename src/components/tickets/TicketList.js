import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tickets.css";

export const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [emergency, setEmergency] = useState(false);
  const [openOnly, updateOpenOnly] = useState(false);
  const navigate = useNavigate();

  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObj = JSON.parse(localHoneyUser);

  useEffect(
    () => {
      fetch("http://localhost:8088/serviceTickets")
        .then((res) => res.json())
        .then((ticketArray) => {
          setTickets(ticketArray);
        });
    },
    [] // When this array is empty, you are observing initial component state
  );

  // filter emergency tickets effect
  useEffect(() => {
    if (emergency) {
      const emergencyTickets = tickets.filter((ticket) => ticket.emergency);
      setFilteredTickets(emergencyTickets);
    } else {
      setFilteredTickets(tickets);
    }
  }, [emergency]);

  useEffect(() => {
    if (honeyUserObj.staff) {
      // employees should see all tickets
      setFilteredTickets(tickets);
    } else {
      const customerTickets = tickets.filter(
        (ticket) => ticket.userId === honeyUserObj.id
      );
      setFilteredTickets(customerTickets);
    }
  }, [tickets]);

  useEffect(() => {
    const openTickets = tickets.filter(
      (ticket) =>
        ticket.userId === honeyUserObj.id && ticket.dateCompleted !== ""
    );

    setFilteredTickets(openTickets);
  }, [openOnly]);

  return (
    <>
      {honeyUserObj.staff ? (
        <>
          {/* display an "emergencies only button" to employee users */}
          <button
            onClick={() => {
              setEmergency(true);
            }}
          >
            Emergencies Only
          </button>
          {/* display a "show all" button to employee users */}
          <button
            onClick={() => {
              setEmergency(false);
            }}
          >
            Show All
          </button>
        </>
      ) : (
        // if the user is a customer, display a button to create a new ticket
        <>
          <button onClick={() => navigate("/ticket/create")}>
            Create Ticket
          </button>
          <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
        </>
      )}
      <h2>List of Tickets</h2>
      <article className="tickets">
        {filteredTickets.map((ticket) => {
          return (
            <section className="ticket" key={ticket.id}>
              <header>{ticket.description}</header>
              <footer>Emergency: {ticket.emergency ? "🚨" : "No"}</footer>
            </section>
          );
        })}
      </article>
    </>
  );
};
