import React from 'react'
import CheckoutComponent from './checkout';
import ProductComponent from './product';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './style.css'

const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductComponent/>,
    },
    {
        path: "/checkout",
        element: <CheckoutComponent/>,
      },
  ]);

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default App;