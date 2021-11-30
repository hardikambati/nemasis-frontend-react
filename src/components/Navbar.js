import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    NavLink
} from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Navbar() {

    // create cookie instance
    const cookie = new Cookies();
    
    return (
        <div>
            <div id="nav-outer">
                <div id="nav-logo">
                    NEMASIS
                </div>
                
                <div id="nav-ele">
                    <div id="nav-ele1">
                        <Link exact to="/" id="nav-a">Home</Link>
                        {cookie.get('JWT-token') ? 
                        <>   
                            <Link exact to="/user-detail" id="nav-a">User-Details</Link>
                            <a id="nav-a" onClick={() => {cookie.remove('JWT-token'); window.location.replace('/');}}>Logout</a>
                        </>
                        :
                        <>
                            <Link exact to="/login" id="nav-a">Login</Link>
                            <Link exact to="/register" id="nav-a">Sign-Up</Link>
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}