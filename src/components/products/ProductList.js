import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductList.css"



export const ProductList = () => {
    const [products, setProducts] = useState([]) //this is just used to pull in the data into state
    const [filteredProducts, setFiltered] = useState([])
    
    const [topProducts, setTop] = useState(false)

    const navigate = useNavigate()

    useEffect( //fetching products
        () => {
            fetch(`http://localhost:8088/products?_sort=candyName&_order=asc&_expand=productType`) //this fetches a sorted products array with the expanded productTypes array on it 
            .then(response => response.json())
            .then(
                (productArray) => {
                    setProducts(productArray)
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
    <button onClick = {() =>setTop(true)}>Top Priced</button>
    <button onClick = {() =>navigate("/products/create")}>Add Product</button>
    <h2>Products</h2>
    <article className="productList">
        {   
            filteredProducts.map(
                (product) => {
                    return <div key={`product--${product.id}`}>{product.candyName}, Price: ${product.price}, Type: {product.productType.type}</div>
                }
            )
                
        }
    </article>

    
    
    </>
}

