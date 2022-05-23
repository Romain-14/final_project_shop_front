import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../../services/api/user";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState();

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        if(!email.length || !password.length){
            return setMsg('Ces champs ne doivent pas être vides !');
        }
        const datas = {
            email: email,
            password: password,
        }
        const res = await signup(datas);
        if(res.status === 201){
            navigate("/user/signIn");
        }
    }

    return (
        <>
            <form onSubmit={(e)=> onSubmitHandler(e)}>
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
                <input type="submit" value="sign up"/>
            </form>

            <p>Already have an account ?</p>
            <Link to="/user/signIn">sign in</Link>
        </>
    );
}

export default SignIn;
