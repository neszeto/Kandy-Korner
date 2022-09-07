import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=location&_expand=user`)
            .then(response => response.json())
            .then(
                (employeeArray) => setEmployees(employeeArray)
            )
        },
        []
    )



    return <>
    <button onClick={ () => navigate("/hiring/form")}>Hiring Form</button>
    <section className="employeeList">
        {
            employees.map(employee => <div>{employee.user.name}, Store Location: {employee.location.address}</div>)
        }
    </section>
    </>
}