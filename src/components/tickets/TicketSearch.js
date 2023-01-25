export const TicketSearch = ({ setterFunction }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(changeEvt) => {
          setterFunction(changeEvt.target.value);
        }}
      />
    </div>
  );
};
