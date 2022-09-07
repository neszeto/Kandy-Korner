import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export const CustomerDetail = () => {
    const {customerId} = useParams()

    const [customer, setCustomer] = useState({})
      
    const [loyaltyNumber, updateLoyalty] = useState({
        loyaltyNum: 0
    })

    const localKandyUser = localStorage.getItem("kandy_user") 
    const kandyUserObject = JSON.parse(localKandyUser) 

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`) //fetches an array with always 1 object
            .then(response => response.json())
            .then(
                (data) => {
                    const customerObject = data[0]
                    setCustomer(customerObject)
                }
            )
        },
        [customerId]
    )

    const updateButton = (event) => {
        event.preventDefault()
        //create object to send to API

        const customerToSendToAPI = {
            loyaltyNumber: parseInt(loyaltyNumber.loyaltyNum),
            userId: kandyUserObject.id

        }

        fetch(`http://localhost:8088/customers/${kandyUserObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerToSendToAPI)
        })
        .then(response=> response.json())
        .then(
            () => {

            }
        )
    }


   return <section className="customer_detail">
        <h2>{customer?.user?.name}</h2>
        <div>Email: {customer?.user?.email}</div>
        <div className="update_loyalty">
            <label htmlFor="loyalty">Loyalty Number: </label>
            <input type="text" name="loyalty" defaultValue={customer.loyaltyNumber}
            onChange= {
                (evt) => {
                    const copy = structuredClone(loyaltyNumber)
                    copy.loyaltyNum = evt.target.value
                    updateLoyalty(copy)
                }
            }
          />
            <button
            onClick={
                (evt) => {
                    updateButton(evt)
                }
            }>Update</button>
        </div>
   </section>
}

//set default values were loyalty number
//create an onchange event to capture input and store in state
//create a function that will run when update button clicked
    //function should create an object to send to API to UPDATE (PUT METHOD) current customer
   
//invoke function in update button

