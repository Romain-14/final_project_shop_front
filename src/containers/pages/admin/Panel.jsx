import { useState } from 'react';
import Loading from '../../../components/Loading';
import { getAllUsers } from '../../../services/api/user';

function Panel({userInfos, products}) {

    const [usersList, setUsersList] = useState([]);
    const [toggleUsersList, setToggleUsersList] = useState(false);
    const [toggleProductsList, setToggleProductsList] = useState(false);
console.log(products)
    const [toggleDisplayForm, setDisplayForm] = useState(false);

    const toggleUsersListHandler = async () => {
        setToggleUsersList(!toggleUsersList);
        const res = await getAllUsers(userInfos.token);
        if(res.status === 200) setUsersList(res.users);
    }
 
    // const displayFormHandler = async () => {
    //     setDisplayForm(!toggleDisplayForm);
    // }

        return (
            <main id="admin-panel" role="main">
                <h2>your admin Panel</h2>
                
                <section className='ctn-admin-panel'>                    
                    <h3>user</h3>
                    <ul>
                        <li onClick={toggleUsersListHandler}>list</li>                        
                        {
                            toggleUsersList && ( usersList.length > 0 ? 
                                usersList.map(user=>{
                                    return (
                                        <ul className="user-list" key={user.id}>
                                            <li>{user.firstname} {user.lastname}</li>
                                            <li>{user.address} {user.zip} {user.city}</li>
                                            <li>{user.email} {user.phone} {user.city}</li>
                                        </ul>
                                    )
                                })
                                :
                                <Loading /> )
                            
                        }
                        {/* <li onClick={displayFormHandler}>add</li> */}
                    </ul>
                   
                </section>

                <section className='ctn-admin-panel'>                    
                    <h3>products</h3>
                    <ul>
                        <li onClick={()=>setToggleProductsList(!toggleProductsList)}>list</li>                        
                        {
                            toggleProductsList && ( products.length > 0 ? 
                                products.map(product=>{
                                    return (
                                        <ul className="user-list" key={product.product_ID}>
                                            <li>{product.product_title} | {product.quantity_in_stock} in stock</li>
                                            <li></li>
                                        </ul>
                                    )
                                })
                                :
                                <Loading /> )
                            
                        }
                        
                    </ul>
                   
                </section>
                <section>                    
                    <h3>categories</h3>
                    <article>

                    </article>
                </section>

                <section>                    
                    <h3>orders</h3>
                    <article>

                    </article>
                </section>




              

            </main>
        );

}

export default Panel;
