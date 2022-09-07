import { CustomerViews } from "./CustomerViews.js"
import { EmployeeViews } from "./EmployeeViews.js"



export const ApplicationViews = () => {
	const localHoneyUser = localStorage.getItem("kandy_user") 
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        //return views for employees
        return <EmployeeViews />

    }
    else {
        //return views for customers
        return <CustomerViews />
    }
}

