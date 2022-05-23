import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateLastConnectionDate } from '../../../services/api/user';
import { signOut } from '../../../store/slices/user';


function SignOut({userInfos}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        signOutHandler();       
    }, []);

    const signOutHandler = async () => {
        const res = await updateLastConnectionDate(userInfos.uuid,userInfos.token)
        if(res.status === 200){
            localStorage.removeItem("user_auth");
            dispatch(signOut());
            navigate("/");
        }
    }

    return null
}

export default SignOut