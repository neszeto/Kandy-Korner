import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductForm.css"

export const ProductForm = () => {
    const navigate = useNavigate()
    const [form, updateForm] = useState(
        {
            productName: "",
            price: 0,
            typeId: 0

        }
        
    )
    const [productTypes, setType] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
            .then(response => response.json())
            .then(
                (typesArray) => {
                    setType(typesArray)
                }
            )
        },
        []
    )
   const Submit = (event) => {
        event.preventDefault()

        const productToSendToAPI = {
            candyName: form.productName,
            price: form.price,
            productTypeId: parseInt(form.typeId)
        }

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
        .then(response=>response.json())
        .then(() => {
            navigate("/products")
        })
    

   }


    return (
        <form className="formField">
            <h2 className="formField_title">New Product Form</h2>
            <fieldset className="inputs">
                <label className="inputField" htmlFor="productInput">Product Name
                <input type="text" name="productInput" placeholder="enter product name..." value={form.productName}
                onChange={
                    (evt) => {
                        const copy = structuredClone(form)
                        copy.productName = evt.target.value
                        updateForm(copy)
                    }
                }/>
                </label>
                <label className="inputField" htmlFor="priceInput">Price
                <input type="number" name="priceInput" placeholder="assign price..." value={form.price} 
                onChange={
                    (evt) => {
                        const copy = structuredClone(form)
                        copy.price = evt.target.value
                        updateForm(copy)
                    }
                }/>
                </label>
                <select className="dropdown" id="types"
                onChange={
                    (evt) => {
                        const copy = structuredClone(form)
                        copy.typeId = evt.target.value
                        updateForm(copy)
                    }
                }>
                    <option value="0">Select Type</option>
                    {
                        productTypes.map(productType => <option value={productType.id}>{productType.type}</option>)
                    }
                </select>
            </fieldset>
                <button
                onClick={
                    (clickEvent) => {
                        Submit(clickEvent)
                    }
                }
                >Submit Product
                </button>
        </form>
    )
}