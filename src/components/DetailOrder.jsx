import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

function DetailOrder({ detailOrder, orderId, toggle }) {
    return (
        <section className="card-detail-order">
			<span className="closeBtn" onClick={(e)=>{
				e.preventDefault();
				toggle();
			}}><FontAwesomeIcon icon={faXmarkCircle} size="2x"/></span>

            {detailOrder.map((detail) => {

                return detail.purchase_id === orderId && (
						<article key={detail.id}>
							<p>{detail.title}</p>
							<p>quantity : {detail.quantity_purchased}</p>
							<p>{detail.total_price}€</p>
							<hr />
						</article>					
                );
            })}
        </section>
    );
}

export default DetailOrder;
