import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import { Nav, NavItem, NavLink } from 'reactstrap';

import { User, Contents } from './pages';



function App() {
  return (
    <Router>
      <nav class="nav flex-column">
        <a class="nav-link" href="/user">User</a>
        <a class="nav-link" href="/Contents">Contents</a>
        <a class="nav-link" href="#">Chat Rooms</a>
        <a class="nav-link" href="#">Chat Contents</a>
      </nav>

      <Route exact path='/user' component={User}/>
      <Route path='/contents' component={Contents}/>
    </Router>
    
  )
}

export default App;
