import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export const CustomerDetail = () => {
    const {customerId} = useParams()

    const [customer, setCustomer] = useState({})


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
   return <section className="customer_detail">
        <h2>{customer?.user?.name}</h2>
        <div>Email: {customer?.user?.email}</div>
        <div>Loyalty Number: {customer?.loyaltyNumber}</div> 
   </section>
}
