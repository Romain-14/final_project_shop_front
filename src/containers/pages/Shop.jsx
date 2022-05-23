import React, { useState } from "react";
import {config} from '../../config/index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { addToCart, calculateTotalAmount } from "../../helpers/cartUtils";
import { useDispatch } from "react-redux";
import { modifyCart } from "../../store/slices/cart";


function Shop({isLogged, userInfos, products, cart}) {
	const [quantity, setQuantity] = useState(1);
	const [toggle, setToggle] = useState(false);

	const dispatch = useDispatch();

	const showDescription = (e) => {
		e.preventDefault();
		setToggle(!toggle);
	}

	const addToCartHandler = (e, product) => {
		
		e.preventDefault();
		console.log(product);
		const newCart = addToCart(cart, product, quantity);
		console.log(newCart)
		dispatch(modifyCart({cart:newCart, totalPrice: calculateTotalAmount(newCart)}));
	}

    return (
        <main>
            <h2>Shop</h2>
            {isLogged && <p>Welcome {userInfos.email}</p>}
			{
				products.length && products.map((product)=>{
					return (
						<article key={product.product_ID} className="card">
							<section>
								<h3>{product.product_title}</h3>
								<p>{product.price}€</p>
								<span style={{backgroundColor:`${product.color}`}}>{product.category_title}</span>
								
								<img src={`${config.img_url}${product.image}`} alt={product.product_title} />
								<button className="btn show-description-btn" onClick={(e)=> showDescription(e)}>Description <FontAwesomeIcon icon={!toggle ? faArrowRight : faArrowDown} /></button>

								{ toggle && <p>{product.description}</p> }
								<div className="ctn-qtt">
									<button onClick={()=>{
											if(quantity <= 1) {
												setQuantity(1)
												return
											}
											setQuantity(quantity - 1)}
										}>-</button>
									<input type="number" min="1" value={quantity} onChange={e=> setQuantity(e.target.value)}/>
									<button onClick={()=>
										
										setQuantity(quantity + 1)
										}>+</button>
								</div>
							</section>
							<button className="btn add-cart-btn" onClick={(e)=>{addToCartHandler(e, product)}}><FontAwesomeIcon icon={faCartArrowDown} size="2x" /></button>
						</article>
					)
				})
			}
        </main>
    );
}

export default Shop;
