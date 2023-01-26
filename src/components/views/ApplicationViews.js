import { CustomerViews } from "./CustomerViews";
import { EmployeeViews } from "./EmployeeViews";

export const ApplicationViews = () => {
  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObj = JSON.parse(localHoneyUser);

  if (honeyUserObj.staff) {
    // show the employee app views
    return <EmployeeViews />;
  } else {
    // show the customer app views
    return <CustomerViews />;
  }
};
