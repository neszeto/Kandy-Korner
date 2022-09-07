
import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const localHoneyUser = localStorage.getItem("kandy_user") 
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        //return navication for employees
        return <EmployeeNav />

    }
    else {
        //return navigation for customers
        return <CustomerNav />
    }
}

