import React, { Component } from 'react';
import { BrowserRouter as Router, Link,Route } from "react-router-dom";
// import  {Login} from '../login'
// import {Regist, Registr} from "../registr";
import {MainPage} from "../main_page";
import '../../App.css';
import createHistory from "history/createBrowserHistory";

const history = createHistory();

let MainPageWithHistory = p => <MainPage history={history} {...p}/>


export class App extends Component {
  render() {
    return (
        <div>
        <Router  history = {history}>
            <div>
          <ul className='menu'>
            <li>
              <Link to='/'>Main Page</Link>
            </li>
            <li>
              <Link to='/recipe/add'>Recipe Add</Link>
            </li>
            {/*<li>*/}
            {/*  <Link to='/registration'>Registr</Link>*/}
            {/*</li>*/}
            {/*  <li>*/}
            {/*  <Link to='/login'>Login</Link>*/}
            {/*</li>*/}
          </ul>
          <Route path='/' component={() => <div> MAIN </div>} exact/>
              <Route path='/recipe/add' component={MainPageWithHistory} exact/>
          {/*<Route path='/registration' component={Registr} exact/>*/}
          {/*<Route path='/login' component={Login} exact/>*/}
            </div>
        </Router>
        </div>
    );
  }
}







