// import React from 'react';
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <NavLink to={'/addproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img src={add_product_icon} alt="add_product_icon" />
                    <p>Add Product</p>
                </div>
            </NavLink>

            <NavLink to={'/listproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img src={list_product_icon} alt="list_product_icon" />
                    <p>Product List</p>
                </div>
            </NavLink>
        </div>
    )
}
