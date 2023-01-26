import { useEffect, useState } from "react";
import "./Employees.css";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/users?isStaff=true&_sort=fullName&_order=asc")
      .then((res) => res.json())
      .then((employeeArray) => setEmployees(employeeArray));
  }, []);

  return (
    <>
      <h3>Employee E-mail Directory:</h3>
      <article className="employees">
        {employees.map((employee) => {
          return (
            <section className="employee" key={employee.id}>
              <div className="employee__name">{employee.fullName}</div>
              <div className="employee__email">{employee.email}</div>
            </section>
          );
        })}
      </article>
    </>
  );
};
