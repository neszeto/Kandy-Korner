import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
            .then(response => response.json())
            .then((expandedArray) => setCustomers(expandedArray))
        },
        []
    )



    return <section>
        <h2>Customer List</h2>
        {
            customers.map(
                (customer) => {
                    return <section>
                        <Link to={`/customer/${customer.user.id}`}>{customer.user.name}</Link> 
                        <div>Email: {customer.user.email}</div>
                    </section>
            })
        }
    </section>
}