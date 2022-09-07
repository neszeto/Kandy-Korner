import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    const renderEmployeeList = () => {
        
        fetch(`http://localhost:8088/employees?_expand=location&_expand=user`)
        .then(response => response.json())
        .then(
            (employeeArray) => setEmployees(employeeArray)
        )
    }
    
    useEffect(
        () => {
            renderEmployeeList()
        },
        []
    )

    const FireButton = (id) => {

        const foundUser = employees.find(employee => employee.id === id)


        fetch(`http://localhost:8088/users/${foundUser.userId}`, {
            method: "DELETE"
        })

        fetch(`http://localhost:8088/employees/${id}`, {
            method: "DELETE"
        })
        .then(response=>response.json)
        .then(renderEmployeeList)
    }


    return <>
    <button onClick={ () => navigate("/hiring/form")}>Hiring Form</button>
    <section className="employeeList">
        {
            employees.map(employee => <div>{employee.user.name}, Store Location: {employee.location.address} 
            <button id={employee.id}
            onClick = {
                (evt) => {
                    let specificEmployeeId = parseInt(evt.target.id)
                    FireButton(specificEmployeeId)
                }
            }>Fire Employee</button>
            </div>)
        }
    </section>
    </>
}