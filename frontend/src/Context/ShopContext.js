import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItem, setcartItem] = useState(getDefaultCart());
    const [products_data, setallproduct] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        fetch("http://localhost:4000/allproducts")
            .then((response) => response.json())
            .then((data) => { setallproduct(data) })

        const authToken = localStorage.getItem('auth-token');
        if (authToken) {
            fetch('http://localhost:4000/getcart', {
                method: "POST",
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': authToken,
                    "Content-Type": "application/json",
                },
                body: "",
            })
                .then((response) => {
                    if (response.ok) {
                        setIsAuthenticated(true);
                        return response.json();
                    } else {
                        setIsAuthenticated(false);
                        return getDefaultCart(); // Set the cart to the default state if not authenticated
                    }
                })
                .then((data) => setcartItem(data));
        }
    }, [])


    const addToCart = (itemId) => {
        setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "auth-token": `${localStorage.getItem('auth-token')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    }


    const removeToCart = (itemId) => {
        setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "auth-token": `${localStorage.getItem('auth-token')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    }

    const getTotalCartAmount = () => {
        let TotalAmount = 0;
        for (const item in cartItem) {
            // console.log(cartItem[item]);
            if (cartItem[item] > 0) {
                let Iteminfo = products_data.find((product) => product.id === Number(item));
                TotalAmount += Iteminfo.new_price * cartItem[item];
            }
        }
        return TotalAmount;
    }

    const gettotalcartitems = () => {
        let totalItem = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                totalItem += cartItem[item];
            }
        }
        return totalItem;
    }

    return (
        <ShopContext.Provider value={{ getTotalCartAmount, gettotalcartitems, products_data, cartItem, addToCart, removeToCart, isAuthenticated }}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
