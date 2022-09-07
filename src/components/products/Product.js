import "./ProductList"






export const Product = ({product, purchase, setPurchase, localUserObject, customers}) => {

    const foundCustomer = customers.find(customer => customer.userId === localUserObject.id)

    const purchaseButton = () => {

        const purchaseToSendToAPI = {
            customerId: foundCustomer.id,
            productId: product.id,
            quantity: purchase.amount
        }

        fetch(`http://localhost:8088/purchases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchaseToSendToAPI)
        })
        .then(response=>response.json())

    }


    return <div key={`product--${product.id}`}>{product.candyName}, 
    Price: ${product.price}, 
    Type: {product.productType.type}, 
    <label htmlFor="quantity"> Quantity</label> 
    <input type="number" name="quantity" className="select_quantity" 
    onChange = {
        (evt) => {
            const copy = structuredClone(purchase)
            copy.amount = parseInt(evt.target.value)
            setPurchase(copy)
        }
    }/>
    <button id={product.id}
    onClick = {
        (evt) => {
            purchaseButton(evt)
        }
    }>Purchase</button>
    </div>
}



//need to create a useState to store state as customer selects quantity
//create a function for when purchase button clicked
    //create an object (purchase) to send to api
    //do a POST request to the purchase array in the api
//invoke function when purchase button clicked