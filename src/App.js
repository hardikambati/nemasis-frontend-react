import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import RoutePath from './components/RoutePath';

function App() {
  return (
    <Router>
      <Navbar />
      <RoutePath />
    </Router>
  );
}

export default App;
