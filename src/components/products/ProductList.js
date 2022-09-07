import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Product } from "./Product"
import "./ProductList.css"



export const ProductList = () => {
    const [products, setProducts] = useState([]) //this is just used to pull in the data into state
    const [filteredProducts, setFiltered] = useState([])
    
    const [topProducts, setTop] = useState(false)

    const [purchase, setPurchase] = useState( 
        {
            amount: 0
        }
    )

    const [customers, setCustomers] = useState([])

    const navigate = useNavigate()

    const localUser = localStorage.getItem("kandy_user")
    const localUserObject = JSON.parse(localUser)

    useEffect( //fetching products
        () => {
            fetch(`http://localhost:8088/products?_sort=candyName&_order=asc&_expand=productType`) //this fetches a sorted products array with the expanded productTypes array on it 
            .then(response => response.json())
            .then(
                (productArray) => {
                    setProducts(productArray)
                }
            )

            fetch(`http://localhost:8088/customers`) 
            .then(response => response.json())
            .then(
                (customerArray) => {
                    setCustomers(customerArray)
                }
            )
        },
        []
    )


    useEffect(
        () => {
            setFiltered(products)
        },
        [products]
    )

    useEffect(
        () => {
            if (topProducts) { //show only top products
                const topPricedProduct = products.filter(product => product.price > 2.00)
                setFiltered(topPricedProduct)
            }
        },
        [topProducts]
    )



    return <>
    {
        localUserObject.staff
        ? <>
        <button onClick = {() =>setTop(true)}>Top Priced</button>
        <button onClick = {() =>navigate("/products/create")}>Add Product</button>
        </>
        : <button onClick = {() =>setTop(true)}>Top Priced</button>
    }
    <h2>Products</h2>
    <article className="productList">
        {   
            filteredProducts.map(
                (product) => {
                    return <Product product={product} 
                    purchase={purchase} 
                    setPurchase={setPurchase}
                    localUserObject={localUserObject} 
                    customers={customers} key={product.id}/>
                }
            )
                
        }
    </article>

    
    
    </>
}

