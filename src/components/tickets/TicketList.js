import { useEffect, useState } from "react";
import "./Tickets.css";

export const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

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

  return (
    <>
      <h2>List of Tickets</h2>
      <article className="tickets">
        {filteredTickets.map((ticket) => {
          return (
            <section className="ticket">
              <header>{ticket.description}</header>
              <footer>Emergency: {ticket.emergency ? "🚨" : "No"}</footer>
            </section>
          );
        })}
      </article>
    </>
  );
};
