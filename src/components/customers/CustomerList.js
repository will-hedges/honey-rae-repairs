import { useEffect, useState } from "react";
import { Customer } from "./Customer";

const API = "http://localhost:8088";

export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(`${API}/customers?_expand=user`)
      .then((res) => res.json())
      .then((customerArray) => {
        setCustomers(customerArray);
      });
  }, []);

  return (
    <section className="customers">
      {customers.map((customer) => {
        return (
          <Customer
            key={customer.id}
            id={customer.id}
            fullName={customer.user.fullName}
            address={customer.address}
            phoneNumber={customer.phoneNumber}
          />
        );
      })}
    </section>
  );
};
