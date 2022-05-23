import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { updateInfos } from "../../../services/api/user";
import { getAllOrdersByValue } from "../../../services/api/order";
import DetailOrder from '../../../components/DetailOrder';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Dashboard({ userInfos }) {
    const [toggleInfos, setToggleInfos] 	    		  = useState(false);
    const [togglePurchases, setTogglePurchases] 		  = useState(false);
    const [togglePurchaseDetail, setTogglePurchaseDetail] = useState(false);

    const [firstname, setFirstname] = useState(userInfos.firstname !== null ? userInfos.firstname : "");
    const [lastname, setLastname]   = useState(userInfos.lastname !== null ? userInfos.lastname : "");
    const [address, setAddress] 	= useState(userInfos.address !== null ? userInfos.address : "");
    const [zip, setZip] 		    = useState(userInfos.zip !== null ? userInfos.zip : "");
    const [city, setCity] 			= useState(userInfos.city !== null ? userInfos.city : "");
    const [phone, setPhone] 	    = useState(userInfos.phone !== null ? userInfos.phone : "");

    const [msg, setMsg] = useState(null);

    const [orders, setOrders] = useState([]);
    const [detailOrder, setDetailOrder] = useState([]);
    const [orderId, setOrderId] = useState(null);

    const toggleInfosHandler = (e) => {
        e.preventDefault();
        setToggleInfos(!toggleInfos);
    };

    const toggleOrderDetail = (e, id) => {
        e.preventDefault();
		setOrderId(id);
        setTogglePurchaseDetail(!togglePurchaseDetail);
    };

    const togglePurchasesHandler = (e) => {
        e.preventDefault();
        setTogglePurchases(!togglePurchases);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const datas = {
            firstname: firstname,
            lastname: lastname,
            address: address,
            zip: zip,
            city: city,
            phone: phone,
            uuid: userInfos.uuid,
        };
        const res = await updateInfos(datas, userInfos.token);
        if (res.status === 200) {
            setMsg(res.msg);
            setToggleInfos(!toggleInfos);
            setTimeout(() => {
                setMsg(null);
            }, 3000);
        }
    };

    useEffect(() => {
        getAllOrdersByValueHandler();
    }, [userInfos]);

    const getAllOrdersByValueHandler = async () => {
        const res = await getAllOrdersByValue(userInfos.uuid, userInfos.token);
        if (res.status === 200) {
            setOrders(res.datas.orders);
            setDetailOrder(res.datas.detail);
        }
    };

    return (
        <section id="dashboard">

			{togglePurchaseDetail && <DetailOrder detailOrder={detailOrder} orderId={orderId} toggle={()=>setTogglePurchaseDetail(!togglePurchaseDetail)}/>}
            {msg !== null && <p>{msg}</p>}
            
            <article>
                <h3 onClick={(e) => toggleInfosHandler(e)}>Mes informations <FontAwesomeIcon icon={faCaretDown} size="2x"/></h3>

                {toggleInfos && (
                  
                    <form onSubmit={(e) => submitHandler(e)}>
                        <input
                            type="text"
                            value={firstname}
                            placeholder="your firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <input
                            type="text"
                            value={lastname}
                            placeholder="your lastname"
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <input
                            type="email"
                            value={userInfos.email}
                            readOnly
                        />
                        <input
                            type="text"
                            value={address}
                            placeholder="your address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <input
                            type="text"
                            value={zip}
                            placeholder="your zip"
                            onChange={(e) => setZip(e.target.value)}
                        />
                        <input
                            type="text"
                            value={city}
                            placeholder="your city"
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                            type="tel"
                            value={phone}
                            placeholder="your phone"
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <input type="submit" value="modifier" />
                    </form>                  
                )}
            </article>

            <section>
                {orders.length > 0 ? <h3 onClick={(e) => togglePurchasesHandler(e)}>Vos commandes <FontAwesomeIcon icon={faCaretDown} size="2x"/></h3> :  <h3> Aucune commandes passées !</h3>}
                
                {togglePurchases && orders.length > 0 && (
                    <>
                        {orders.map((order) => {
                            return (
                                <article className="mini-card-order" key={order.id}>
                                    <p><span className="bold">Commande n°</span> {order.id}</p>
                                    <p><span className="bold">Passée le</span> : {dayjs(order.date).format("DD-MM-YYYY à HH:MM")}</p>
                                    <p><span className="bold">Prix</span> : {order.total_price}€</p>
                                    <p><span className="bold">Statut</span> : {order.status}</p>
									<button className="detail-btn" onClick={(e)=> toggleOrderDetail(e, order.id)}>Voir le détail</button>
                                </article>
                            );
                        })}
                    </>                    
                )}
            </section>
        </section>
    );
}

export default Dashboard;
