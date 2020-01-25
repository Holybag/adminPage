import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

import { User, Contents, ChatContents } from './pages';



function App() {
  return (
    <Router>
      <Nav vertical>
        <NavItem>
          <NavLink href="/user">User</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/contents">Contents</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/chatcontents">Chat Contents</NavLink>
        </NavItem>
      </Nav>

      <Route exact path='/user' component={User}/>
      <Route path='/contents' component={Contents}/>
      <Route path='/chatcontents' component={ChatContents}/>
    </Router>
    
  )
}

export default App;
