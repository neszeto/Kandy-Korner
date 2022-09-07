import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const CustomerNav = () => {
    const navigate = useNavigate()


    return (
        <ul className="navbar">
            <li className="navbar_products">
                <Link className="products" to="/products">Products</Link>
            </li>    
            <li className="navbar_products">
                <Link className="find_candy" to="/findCandy">Find Candy</Link>
            </li>
            <li className="navbar_products">
                <Link className="orders" to="/orders">My Orders</Link>
            </li>
            <li className="navbar_products">
                <Link className="locations" to="/locations">Store Locations</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}