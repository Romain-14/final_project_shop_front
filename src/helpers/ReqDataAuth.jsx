import { useParams, useNavigate, useLocation  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api/product";
import { checkToken } from "../services/api/user";
import { loadProducts } from "../store/slices/product";
import { signIn } from "../store/slices/user";

function ReqDataAuth(props) {
    const params   = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLogged, products, userInfos, cart, totalPrice } = useSelector((state) => ({
        ...state.product,
        ...state.user,
		...state.cart,
    }));
    
    const Child = props.child;

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        loadStore();
    }, [props]);

    useEffect(() => {
        if(redirect) navigate("/notFound");
    }, [redirect]);



    const loadStore = async () => {
        if (!products.length) {
            const res = await getProducts();
            if (res.status === 200) {
                dispatch(loadProducts(res.products));
            }
        }

        console.log('loadStore', location);
        console.log(userInfos);

        if(isLogged && location.pathname === "/admin" && userInfos.role_id !== 1){
            setRedirect(true);
        }

        if (isLogged === false ) {
            if(location.pathname === "/admin") setRedirect(true);
            const TOKEN = localStorage.getItem("user_auth");
            if(TOKEN !== null){
                const res = await checkToken(TOKEN);
                if (res.status !== 200) {
                    console.log('probleme recup token');
                } else {
                    const user = res.user;
                    user.token = TOKEN;
                    dispatch(signIn(user));
                }
            }
        }      
    };


    return (
        <Child
            params={params}
            products={products}
            isLogged={isLogged}
            userInfos={userInfos}
            cart={cart}
            totalPrice={totalPrice}
            />         
    );
}

export default ReqDataAuth;
