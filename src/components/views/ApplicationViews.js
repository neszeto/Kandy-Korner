import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList.js"
import { ProductList } from "../products/ProductList.js"
import { ProductForm } from "../products/ProductForm.js"


export const ApplicationViews = () => {
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
            </Route>
        </Routes>
	</>
}

