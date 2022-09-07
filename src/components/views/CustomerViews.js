import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList.js"
import { ProductForm } from "../products/ProductForm.js"

import { FindProduct } from "../products/FindProduct.js"
import { ProductList } from "../products/ProductList.js"
import { MyOrders } from "../products/MyOrders.js"


export const CustomerViews = () => {
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
                <Route path="findCandy" element={<FindProduct />} />	
                <Route path="orders" element={<MyOrders />} />	
            </Route>
        </Routes>
	</>
}