import { CustomerNavBar } from "./CustomerNavBar";
import { EmployeeNavBar } from "./EmployeeNavBar";
import "./NavBar.css";

export const NavBar = () => {
  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObj = JSON.parse(localHoneyUser);

  if (honeyUserObj.staff) {
    return <EmployeeNavBar />;
  } else {
    return <CustomerNavBar />;
  }
};
