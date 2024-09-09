import React from "react";
import ReactDom from 'react-dom/client'
import {router} from './App'
import './index.css'
import { RouterProvider } from "react-router-dom";
const root = ReactDom.createRoot(document.getElementById('root'))


root.render(
 <RouterProvider router={router}/>
)