import React, { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { signin } from "../../../services/api/user";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState();

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(!email.length || !password.length){
            return setMsg('Ces champs ne doivent pas être vides !');
        }
        const datas = {
            email: email,
            password: password,
        }
        const res = await signin(datas);
        console.log(res);
        if(res.status === 200){
            console.log('REEEEES',res)
            if(res.isAccountValidated === "yes"){
                localStorage.setItem("user_auth", res.token);
                console.log(res);                
                navigate("/");
                return;                
            } else {
                setMsg("Veuillez valider votre compte avec le lien reçu sur votre adresse mail avant d'acceder au site");
                return;
            }
        }
        if(res.response.data.status === 404){
            setEmail("");
            setPassword("");
            setMsg(res.response.data.msg);
            return;
        }
    };

    return (
        <>
            <form onSubmit={(e) => onSubmitHandler(e)}>
                {msg !== null && <p>{msg}</p>}
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="your password"
                />
                <input type="submit" value="sign in" />
            </form>

            <p>No account yet ?</p>
            <Link to="/user/signUp">sign up</Link>
        </>
    );
}

export default SignIn;
