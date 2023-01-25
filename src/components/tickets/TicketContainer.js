import { useState } from "react";
import { TicketSearch } from "./TicketSearch";
import { TicketList } from "./TicketList";

export const TicketContainer = () => {
  // the input is going to be a string, initially should be empty
  const [searchTerms, setSearchTerms] = useState("");

  return (
    <>
      <TicketSearch
        setterFunction={setSearchTerms}
        example1={100}
        example2={"foobar"}
      />
      <TicketList searchTermState={searchTerms} />
    </>
  );
};
