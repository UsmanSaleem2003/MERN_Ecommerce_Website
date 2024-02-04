import { useEffect, useState } from 'react'
import "./ListProduct.css"
import cross_icon from "../../assets/cross_icon.png"

export default function ListProduct() {

    const [allproducts, setallproducts] = useState([]);

    const fetchInfo = async () => {
        try {
            const response = await fetch("http://localhost:4000/allproducts");
            const data = await response.json();
            console.log("Fetched data:", data); // Log the fetched data
            setallproducts(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id })
        })
        await fetchInfo();
    }

    return (
        <div className='listproduct'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Titles</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>

            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => {
                    return (
                        <>
                            <div key={index} className='listproduct-format-main listproduct-format'>
                                <img src={product.image} alt='product-icon' className='listproduct-product-icon' />
                                <p>{product.name}</p>
                                <p>${product.old_price}</p>
                                <p>${product.new_price}</p>
                                <p>{product.category}</p>
                                <img onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt='cross_icon' />
                            </div>
                            <hr />
                        </>
                    );
                })}
            </div>

        </div>
    )
}
