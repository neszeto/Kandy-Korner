import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const localUser = localStorage.getItem("kandy_user")
    const localUserObject = JSON.parse(localUser)

    return (
        <ul className="navbar">
            {
                localUserObject.staff
                ? <Link className="products" to="/products">Products</Link>// staff view
                : ""//customer view
            }
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
            <li className="navbar_locations">
                <Link className="locations" to="/locations">Store Locations</Link>
            </li>
        </ul>
    )
}

