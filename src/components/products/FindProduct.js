import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const FindProduct = () => {
    const [searchedCandy, setSearched] = useState("")
    const [candy, setCandy] = useState([])
    const [filteredCandy, setFiltered] = useState([])

    useEffect(
        () => {
            if (searchedCandy) {
                const searchedProduct = candy.filter(c => c.product.candyName.toLowerCase().startsWith(searchedCandy.toLowerCase()))
                setFiltered(searchedProduct)
            }
            else {
                setFiltered([])
            }
            
        },
        [searchedCandy]
    )
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/locationProducts?_expand=product&_expand=location`)
            .then(response => response.json())
            .then(
                (productArray) => {
                    setCandy(productArray)
                }
            )
        },
        []
    )


    

    return <>
        <section>
            <label htmlFor="findCandy">What candy are you looking for?</label>
            <input onChange = {
                (evt) => {
                    setSearched(evt.target.value)
                }
            }
            type="text" 
            placeholder="enter candy name..." 
            name="findCandy"/>
        </section>
        <section>
           {
                filteredCandy.map(candy => {
                    return <>
                    <div key={candy.product.id}>{candy.product.candyName} {candy.product.price}</div>
                    <Link className="show_where" to="" 
                        onClick={() => {
    
                            alert(`Product can be found at ${candy.location.address}`)
                        }}                  
                        >Show me where</Link>
                    </>
                })
            }
        </section>
        
    </>
}
