import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TicketForm = () => {
  /*
    TODO: Add the correct default properties to the
    initial state object
  */
  const [ticket, update] = useState({
    description: "",
    emergency: false,
  });
  /*
    TODO: Use the useNavigation() hook so you can redirect
    the user to the ticket list
  */

  const navigate = useNavigate();
  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObject = JSON.parse(localHoneyUser);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    // userId, desc, emergency, dateCompleted
    const newTicketObj = {
      // user stored in localStorage
      userId: honeyUserObject.id,
      // description, emergency states stored in state variable ticket
      description: ticket.description,
      emergency: ticket.emergency,
      // TODO
      dateCompleted: "",
    };
    return fetch("http://localhost:8088/serviceTickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTicketObj),
    })
      .then((res) => res.json())
      .then(() => navigate("/tickets"));
  };

  return (
    <form className="ticketForm">
      <h2 className="ticketForm__title">New Service Ticket</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Brief description of problem"
            value={ticket.description}
            onChange={(evt) => {
              // make a copy of the current ticket
              const copy = { ...ticket };
              // set the ticket description to the value of the description field
              copy.description = evt.target.value;
              // update ticket state
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="emergency">Emergency:</label>
          <input
            type="checkbox"
            value={ticket.emergency}
            onChange={(evt) => {
              const copy = { ...ticket };
              // see if emergency button is checked
              copy.emergency = evt.target.checked;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <button
        className="btn btn-primary"
        onClick={(evt) => handleSaveButtonClick(evt)}
      >
        Submit Ticket
      </button>
    </form>
  );
};
