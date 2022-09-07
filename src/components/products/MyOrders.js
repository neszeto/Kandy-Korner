
//list all orders for the logged in user

import { useEffect, useState } from "react"

//use state to store purchases array...include customers array on here to access userId
//use effect to observe initial state
//filter the expanded purchases array for all objects who's userId matches the kandy User id 
//map this array and display in browser

export const MyOrders = () => {
    
    const [purchases, setPurchases] = useState([])

    const localUser = localStorage.getItem("kandy_user")
    const localUserObject = JSON.parse(localUser)
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=customer&_expand=product`)
            .then(response=>response.json())
            .then(
                (data) => {setPurchases(data)}
            )
        },
        []
    )
    
    const foundPurchases = purchases.filter(purchase => purchase.customer.userId === localUserObject.id)

    return (
        foundPurchases.map(found=> <div>{found.quantity} {found.product.candyName}, ${found.product.price} each</div>)
    )
    

    
    
}