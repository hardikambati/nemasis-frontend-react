import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    Switch,
    NavLink
  } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import UserDetail from './UserDetail';
import Home from './Home';

// defines all route path's
export default function RoutePath() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />

            <Route path="/user-detail" element={<UserDetail />} />
        </Routes>
    );
}