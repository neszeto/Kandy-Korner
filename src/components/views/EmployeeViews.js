import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList.js"
import { ProductList } from "../products/ProductList.js"
import { ProductForm } from "../products/ProductForm.js"
import { EmployeeList } from "../employees/EmployeeList.js"
import { HiringForm } from "../employees/HiringForm.js"
import { CustomerList } from "../customers/CustomerList.js"
import { CustomerDetail } from "../customers/CustomerDetail.js"


export const EmployeeViews = () => {
	return <>
	<Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    

                    <Outlet />
                </>
            }>
				<Route path="products" element={<ProductList />} />	
				<Route path="locations" element={<LocationsList />} />
				<Route path="products/create" element={<ProductForm />} />	
                <Route path="employees" element={<EmployeeList />} />	
                <Route path="hiring/form" element={<HiringForm />} />
                <Route path="customers" element={<CustomerList />} />
                <Route path="customer/:customerId" element={<CustomerDetail />} />
            </Route>
        </Routes>
	</>
}