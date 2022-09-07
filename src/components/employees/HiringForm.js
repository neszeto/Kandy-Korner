
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const HiringForm = () => {
    const [userInput, setUserInput] = useState({
        employeeName: "",
        employeeEmail: "",
        hiringDate: "",
        rate: 0,
        idForLocation: 0
       
    })

    const [locations, setLocations] = useState([])
  
    const navigate = useNavigate()

    

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then(
                (locationArray) => setLocations(locationArray)
            )
        },
        []
    )




const HireEmployeeButton = (event) => {
    event.preventDefault()
    
    

    const userToSendToAPI = {
        name: userInput.employeeName,
        email: userInput.employeeEmail,
        isStaff: true
    }
  

    return fetch(`http://localhost:8088/users`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(userToSendToAPI)
    })
    .then(response=>response.json())
    .then((updatedUsersArray) => {
        
        const employeeToSendToAPI = {
            startDate: userInput.hiringDate,
            payRate: userInput.rate,
            locationId: userInput.idForLocation,
            userId: updatedUsersArray.id
        }

        return fetch(`http://localhost:8088/employees`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(employeeToSendToAPI)
        })
    })
    .then(response => response.json())
    .then(
        () => {
            navigate("/employees")
        }
    )
}



    return<>
    <form className="hiring_form">
        <h2>New Hire Form</h2>
        <fieldset>
            <div className="form-name">
                <label htmlFor="input_name">Employee Name</label>
                <input type="text" name="input_name" placeholder="enter employee's name..." value={userInput.employeeName}
                    onChange={
                        (evt) => {
                            const copy = structuredClone(userInput)
                            copy.employeeName = evt.target.value
                            setUserInput(copy)
                        }
                    }/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-name">
                <label htmlFor="input_email">Employee Email</label>
                <input type="text" name="input_email" placeholder="enter employee's email..." value={userInput.employeeEmail} 
                    onChange={
                        (evt) => {
                            const copy = structuredClone(userInput)
                            copy.employeeEmail = evt.target.value
                            setUserInput(copy)
                        }
                }/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-location">
                <label htmlFor="dropdown">Hiring Location 
                <select name="dropdown"
                    onChange={
                        (evt)=> {
                            const copy = structuredClone(userInput)
                            copy.idForLocation = parseInt(evt.target.value)
                            setUserInput(copy)
                        }
                    }>
                    <option value="0">Select Location</option>
                   {
                    locations.map(location => <option value={location.id}>{location.address}</option>)
                   }
                </select>
                </label>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-date">
                <label htmlFor="input_date">Starting date
                <input type="date" name="input_date" value={userInput.hiringDate} 
                    onChange={
                        (evt) => {
                            const copy = structuredClone(userInput)
                            copy.hiringDate= evt.target.value
                            setUserInput(copy)
                        }
                }/>
                </label>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-rate">
                <label htmlFor="input_rate">Pay Rate (dollars per hour)
                    <input type="number" name="input_rate" value={userInput.rate} 
                        onChange={
                            (evt) => {
                                const copy = structuredClone(userInput)
                                copy.rate = parseInt(evt.target.value)
                                setUserInput(copy)
                            }
                    }/>
                </label>
            </div>
        </fieldset>
    </form>
    <button
        onClick={
            (evt) => {
                HireEmployeeButton(evt)
            }
        }>Hire Employee</button>
    </>
}



//create a useState for the initial state object when user is typping into input fields to capture user input


//create a function that will run when the submit button is clicked
//when button clicked, two objects should be created (one for users and one for employee)
//two fetch calls should be made to push the objects into their appropriate arrays 



  