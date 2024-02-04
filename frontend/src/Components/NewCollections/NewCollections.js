import React, { useState, useEffect } from 'react'
import "./NewCollections.css"
// import new_collection from "../Assets/new_collections";
import Item from "../Items/Item";

export default function NewCollections() {

    const [new_collection, setnew_collection] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/newcollections")
            .then((response) => response.json())
            .then((data) => setnew_collection(data));
    }, []);

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className='collections'>
                {new_collection.map((item, i) => {
                    return (
                        <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    )
                })}
            </div>
        </div>
    )
}
