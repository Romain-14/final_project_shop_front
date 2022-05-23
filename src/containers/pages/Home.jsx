import React, { useState } from "react";
import {config} from '../../config/index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function Home({isLogged, userInfos, products}) {

	const [toggle, setToggle] = useState(false);

	const showDescription = (e) => {
		e.preventDefault();
		setToggle(!toggle);
	}

    return (
        <main>
            {isLogged && <p>Welcome {userInfos.email}</p>}
			{
				products.length && products.map((product, index)=>{
					return index < 3 && (
						<article key={product.product_ID} className="card">
							<section>
								<h3>{product.product_title}</h3>
								<p>{product.price}€</p>
								<span style={{backgroundColor:`${product.color}`}}>{product.category_title}</span>
								
								<img src={`${config.img_url}${product.image}`} alt={product.product_title} />
								<button className="btn show-description-btn" onClick={(e)=> showDescription(e)}>Description <FontAwesomeIcon icon={!toggle ? faArrowRight : faArrowDown} /></button>

								{ toggle && <p>{product.description}</p> }

							</section>
							<button className="btn add-cart-btn"><FontAwesomeIcon icon={faCartArrowDown} size="2x" /></button>
						</article>
					)
				})
			}
        </main>
    );
}

export default Home;
