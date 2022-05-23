import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function User({ isLogged }) {
	const navigate = useNavigate();

	useEffect(()=>{
		if(isLogged) navigate("dashboard");
	}, []);

    return (
        <main>
            <h2>{isLogged ? "Dashboard" : "sign in to buy amaziiiiiing stuff" }</h2>
			
            <Outlet />
        </main>
    );
}

export default User;