import React, {useState}  from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { saveOrder } from "../services/api/order";
import { config } from "../config/index";
import { calculateTotalAmount, updateCart } from "../helpers/cartUtils";
import { cleanCart, modifyCart } from "../store/slices/cart";


function Cart({ cart, totalPrice, userInfos }) {
	const dispatch = useDispatch();
	const [msg, setMsg] = useState(null);
	const navigate = useNavigate();

	const updateQuantity = (e, product, type, nbr) => {
		const newCart = updateCart(cart, product, type, parseInt(nbr));
		dispatch(modifyCart({cart:newCart, totalPrice: calculateTotalAmount(newCart)}));
	}

	const deleteCartHandler = (e) => {
		e.preventDefault();
		localStorage.removeItem('cart');
		dispatch(cleanCart());
	}

	const saveOrderHandler = async (e) => {
		e.preventDefault();
		const datas = {
			uuid: userInfos.uuid,
			cart: cart,
		}
		const response = await saveOrder(datas, userInfos.token);
		if(response.status === 200){
			// localStorage.removeItem('cart');
			setMsg('Redirection in 3seconds to payed :)')
			setTimeout(() => {
				navigate("payment");
			}, 3000);
		}
	}

    return (
        <main>
            <h2>Your cart</h2>

			{msg !== null && <p> {msg}</p>}

			{cart.length > 0 ? <>
					<button onClick={(e)=> deleteCartHandler(e)}>clean the cart</button>
					<p>Total Amount : {totalPrice.toFixed(2)}€</p>
					<button onClick={(e)=> saveOrderHandler(e)}>pay the order</button>
					
					</>
					:
					<>
						<p>Your cart is empty</p>
						<Link to="/shop">Go to Shop</Link>
					</>
			}

			{cart?.map((product) => {
                    return (
                        <article key={product.product_ID} className="card">
                            <section>
                                <h3>{product.product_title}</h3>
                                <p>{product.price}€</p>

                                <img
                                    src={`${config.img_url}${product.image}`}
                                    alt={product.product_title}
                                />

								<div className="ctn-qtt">
									<label>quantity :</label> 
									<button onClick={(e)=>{
										if(product.quantity <= 1) {											
											return;
										}
										updateQuantity(e, product, "moins", 1)
									}}>-</button>
									<input type="number" min="1" value={product.quantity} onChange={(e)=> updateQuantity(e, product)}/>
									<button onClick={(e)=> updateQuantity(e, product, "plus", 1)}>+</button>

								</div>
								
								<p>price for this product : {(product.price * product.quantity).toFixed(2)}€</p>
								<p>in fact i don't want it anymore </p>
								{/* <button onClick={(e)=> deleteCartHandler()}>clean from cart</button> */}

                            </section>
                        </article>
                    );
            	})}
				
				
			
          
			
        </main>
    );
}

export default Cart;
