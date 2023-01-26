import "./Customers.css";

export const Customer = ({ fullName, address, phoneNumber }) => {
  return (
    <div className="customer">
      <div className="customer__name">{fullName}</div>
      <div className="customer__address">{address}</div>
      <div className="customer__phone-number">{phoneNumber}</div>
    </div>
  );
};
