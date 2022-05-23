import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./containers/pages/Home";
import Shop from "./containers/pages/Shop";
import User from "./containers/pages/user/User";
import SignIn from "./containers/pages/user/SignIn";
import ValidateAccount from "./containers/pages/user/ValidateAccount";
import SignUp from "./containers/pages/user/SignUp";
import SignOut from "./containers/pages/user/SignOut";
import Dashboard from "./containers/pages/user/Dashboard";
import Cart from "./components/Cart";
import Form from "./components/ui/form/Form";
import Product from "./containers/pages/Product";
import Notfound from "./containers/pages/Notfound";
import ReqDataAuth from "./helpers/ReqDataAuth";
import Panel from './containers/pages/admin/Panel';

function App() {
    return (
        <>
        <Header />
          
            <Routes>
                <Route index path="/" element={<ReqDataAuth child={Home} auth={false}/>} />

                <Route path="shop" element={<ReqDataAuth child={Shop} auth={false}/>}>
                    <Route path="product/:id" element={<Product />} />
                </Route>
                <Route path="cart" element={<ReqDataAuth child={Cart} auth={true}/>}/>

                <Route path='admin' element={<ReqDataAuth child={Panel} auth={"admin"}/>}/>
                    {/* <Route path='product'/>
                    <Route path='/' />
                    <Route path='add' />
                    <Route path='edit/:id' />
                    <Route path='delete/:id' /> */}
                
                <Route path="user" element={<ReqDataAuth child={User} />}>
                    <Route path="signIn" element={<ReqDataAuth child={SignIn} auth={false}/>}/>
                    <Route path="validateAccount/:uuid" element={<ReqDataAuth child={ValidateAccount} />}/>
                    <Route path="signUp" element={<ReqDataAuth child={SignUp} auth={false}/>}/>
                    <Route path="signOut" element={<ReqDataAuth child={SignOut} auth={true}/>}/>
                    <Route path="dashboard" element={<ReqDataAuth child={Dashboard} auth={true}/>}/>                    
                    <Route path="edit/:id" element={<ReqDataAuth child={Form} auth={true}/>}/>
                </Route>

                <Route path="notFound" element={<Notfound />} />
                <Route index path="*" element={<Notfound />} />
            </Routes>
        <Footer />
        </>
    );
}

export default App;
