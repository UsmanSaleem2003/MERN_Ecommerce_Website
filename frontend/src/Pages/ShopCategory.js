import React, { useContext } from 'react'
import "./css/ShopCategory.css";
import { ShopContext } from '../Context/ShopContext';
import { DownOutlined } from '@ant-design/icons';
import Item from "../Components/Items/Item";

export default function ShopCategory(props) {

    const { products_data } = useContext(ShopContext);
    // console.log(products_data);

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt='' />
            <div className='shopcategory-indexSort'>
                <p>
                    <span> Showing 1-12 </span> out of 36 products
                </p>
                <div className='shopcategory-sort'>
                    Sort by <DownOutlined />
                </div>
            </div>
            <div className='shopcategory-products'>
                {products_data.map((item, i) => {
                    if (props.category === item.category) {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    }
                    else {
                        return null;
                    }
                })}
            </div>
            <div className='shopcategory-loadmore'>
                Explore More
            </div>
        </div>
    )
}
